import contributeToProject from "../zenflows/addContributors";

export const addContributorHandler = async (
  contributor: string,
  processId: string,
  projectId: string
) => {
  const contributeVariables = {
    agent: contributor,
    process: processId,
    creationTime: new Date().toISOString(),
    unitOne: "0637V2ZFFM4ZHZPSVNYNCBAW94",
    // we need some system variables for contributions types
    conformsTo: "0637V2ZFFM4ZHZPSVNYNCBAW94",
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
  // addStrengthsPoints(contributor, StrengthsPoints.OnContributions);
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
