import contributeToProject from "../zenflows/addContributors";
import { addStrengthsPoints, StrengthsPoints } from "./addPointsHandler";

export const addContributorHandler = async (
  contributor: string,
  processId: string,
  projectId: string
) => {
  const contributeVariables = {
    agent: "0630EEVR4N5Z16NNDGZ4KMV1AW",
    process: processId,
    creationTime: new Date().toISOString(),
    unitOne: "0637V2ZFFM4ZHZPSVNYNCBAW94",
    // we need some system variables for contributions types
    conformsTo: "0637TVG24ZA29N7KRV2NPK7NBC",
  };
  const { errors } = await contributeToProject(contributeVariables);
  if (errors) {
    console.log(`${contributor} not added as contributor: ${errors}`);
  }
  // const message: AddedAsContributorNotification = {
  //   projectOwnerId: user!.ulid,
  //   text: "you have been added as a contributor to a project",
  //   resourceName: projectId,
  //   resourceID: projectId,
  //   projectOwnerName: user!.name,
  // };
  // await sendMessage(message, [contributor], MessageSubject.ADDED_AS_CONTRIBUTOR);
  // //economic system: points assignments
  // addIdeaPoints(user!.ulid, IdeaPoints.OnContributions);
  const response = await addStrengthsPoints(contributor, StrengthsPoints.OnContributions);
  console.log("strengths points response", response);
};

const addContributorsHandler = async (
  projectId: string,
  contributors: string[],
  processId: string
) => {
  for (const contributor of contributors) {
    await addContributorHandler(contributor, processId, projectId);
  }
};

export default addContributorsHandler;
