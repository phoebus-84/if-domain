import contributeToProject from "../zenflows/addContributors";
import {
  addIdeaPoints,
  addStrengthsPoints,
  IdeaPoints,
  StrengthsPoints,
} from "./addPointsHandler";
import sendMessage, {
  AddedAsContributorNotification,
  MessageSubject,
} from "./sendMessageHandler";

export const addContributorHandler = async (
  contributor: string,
  processId: string,
  projectId: string,
  userId: string
) => {
  const contributeVariables = {
    // agent: contributor,
    agent: "0630EEVR4N5Z16NNDGZ4KMV1AW",
    process: processId,
    creationTime: new Date().toISOString(),
    // unitOne: getUnit,
    unitOne: "0637V2ZFFM4ZHZPSVNYNCBAW94",
    // we need some system variables for contributions types
    conformsTo: "0637TVG24ZA29N7KRV2NPK7NBC",
    // conformsTo:confomsTo
  };
  const { errors, event } = await contributeToProject(contributeVariables);
  if (errors) {
    console.log(`${contributor} not added as contributor: ${errors}`);
    return {
      errors,
    };
  }
  const message: AddedAsContributorNotification = {
    projectOwnerId: userId,
    text: "you have been added as a contributor to a project",
    resourceName: projectId,
    resourceID: projectId,
  };
  const messageResponse = await sendMessage(
    message,
    [contributor],
    MessageSubject.ADDED_AS_CONTRIBUTOR,
    userId
  );
  //economic system: points assignments
  const stPoints = await addStrengthsPoints(
    contributor,
    StrengthsPoints.OnContributions
  );
  const idPoints = await addIdeaPoints(userId, IdeaPoints.OnContributions);

  console.log(
    JSON.stringify({
      event,
      messageResponse: messageResponse.ok,
      stPoints: stPoints.ok,
      idPoints: idPoints.ok,
    })
  );
};

const addContributorsHandler = async (
  projectId: string,
  contributors: string[],
  processId: string,
  userId: string
) => {
  for (const contributor of contributors) {
    await addContributorHandler(contributor, processId, projectId, userId);
  }
};

export default addContributorsHandler;
