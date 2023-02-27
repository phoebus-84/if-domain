import createProcess from "../zenflows/createProcces";
import {
  createProposal,
  linkContributionProposalIntent,
  proposeContribution,
} from "../zenflows/proposal";
import { forkProject } from "../zenflows/forkProject";
import { getProjectForMetadataUpdate } from "./../zenflows/project";
import {
  addIdeaPoints,
  addStrengthsPoints,
  IdeaPoints,
  StrengthsPoints,
} from "./addPointsHandler";
import sendMessage, { MessageSubject } from "./sendMessageHandler";
const createContributionHandler = async (
  data: any,
  projectId: string,
  userId: string
) => {
  const project = await getProjectForMetadataUpdate(projectId);
  if (!project) throw new Error("No original resource found");
  const processName = `fork of ${project.name} by ${userId}`;
  const processId = await createProcess(processName);
  if (!processId) throw new Error("Process not created");
  const forkVariables = {
    resource: projectId,
    process: processId,
    agent: userId,
    name: `${project.name} forked by ${userId}`,
    note: data.description,
    metadata: JSON.stringify(project?.metadata),
    location: project!.currentLocation?.id,
    unitOne: "one", //
    creationTime: new Date().toISOString(),
    repo: data.contributionRepositoryID,
    tags: project!.classifiedAs,
    spec: project!.conformsTo.id,
  };
  const forkedProjectId = await forkProject(forkVariables);
  if (!forkedProjectId) throw new Error("No forked project id found");

  const processContributionName = `contribution of ${project.name} by ${userId}`;
  const processContributionId = await createProcess(processContributionName);

  const proposalVariables = { name: processName, note: data.description };
  const proposalId = await createProposal(proposalVariables);

  const contributionVariables = {
    resourceForked: forkedProjectId,
    resourceOrigin: project.id,
    process: processContributionId,
    owner: project.primaryAccountable.id,
    proposer: userId,
    unitOne: "one", //
    creationTime: new Date().toISOString(),
  };
  const contribution = await proposeContribution(contributionVariables);
  const linkProposalAndIntentsVariables = {
    proposal: proposalId,
    citeIntent: contribution.data?.citeResourceForked.intent.id,
    acceptIntent: contribution.data?.acceptResourceOrigin.intent.id,
    modifyIntent: contribution.data?.modifyResourceOrigin.intent.id,
  };
  const linkProposalAndIntentsResult = await linkContributionProposalIntent(
    linkProposalAndIntentsVariables
  );

  const message = {
    proposalID: proposalId,
    text: data.description,
    type: data.type,
    originalResourceName: project.name,
    originalResourceID: project.id,
    proposerName: userId,
    ownerName: project.primaryAccountable.name,
  };

  sendMessage(
    message,
    [project.primaryAccountable.id],
    MessageSubject.CONTRIBUTION_REQUEST,
    userId
  );

  //economic system: points assignments
  addIdeaPoints(project.primaryAccountable.id, IdeaPoints.OnFork);
  addStrengthsPoints(userId, StrengthsPoints.OnFork);

  return proposalId;
};
