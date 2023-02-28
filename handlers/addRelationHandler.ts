import { getProjectForMetadataUpdate as getProjectForMetadata } from "./../zenflows/project";
import { citeProject } from "../zenflows/citeProject";
import { CiteProjectVariables } from "./../zenflows/citeProject";
import sendMessage from "./sendMessageHandler";

export const addRelationHandler = async (
  projectId: string,
  processId: string,
  originalProjectId: string,
  userId: string
) => {
  const citeVariables: CiteProjectVariables = {
    agent: userId,
    // agent: "0637V2EY26ZPWK87EZMJTF0034",
    resource: projectId,
    process: processId,
    creationTime: new Date().toISOString(),
    unitOne: process.env.UNIT_ONE!,
  };
  try {
    const response = await citeProject(citeVariables);
    if (!response) throw new Error("Project not cited");

    const resource = await getProjectForMetadata(originalProjectId)
    const resourceOwner = resource.primaryAccountable.id;
    const message = {
      proposalID: projectId,
      originalResourceID: originalProjectId,
      originalResourceName: originalProjectId,
    };
    await sendMessage(message, [resourceOwner], "Project cited", userId);

    //economic system: points assignments
    // addIdeaPoints(user!.ulid, IdeaPoints.OnCite);
    // addStrengthsPoints(resourceOwner, StrengthsPoints.OnCite);
  } catch (e) {
    console.log(e);
    console.error(e);
  }
};

export const addRelationsHandler = async (
  projectId: string,
  addRelationsArray: string[],
  processId: string,
  userId: string
) => {
  for (const relation of addRelationsArray) {
    await addRelationHandler(relation, processId, projectId, userId);
  }
};

export const addDesignHandler = async (
  design: string,
  process: string,
  originalProjectId: string,
  userId: string
) => {
  await addRelationHandler(design, process, originalProjectId, userId);
};
