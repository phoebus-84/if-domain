import { citeProject } from "../zenflows/citeProject";
import { CiteProjectVariables } from "./../zenflows/citeProject";

export const addRelationHandler = async (
  projectId: string,
  processId: string,
  originalProjectId: string
) => {
  const citeVariables: CiteProjectVariables = {
    agent: "0637V2EY26ZPWK87EZMJTF0034",
    resource: projectId,
    process: processId,
    creationTime: new Date().toISOString(),
    unitOne: process.env.UNIT_ONE!,
  };
  try {
    const response = await citeProject(citeVariables);
    console.log("response", response);
    // const { data } = await refetch({ id: projectId });
    // const resourceOwner = data.economicResource.primaryAccountable.id;
    // const message = {
    //   proposalID: projectId,
    //   proposerName: "0637V2EY26ZPWK87EZMJTF0034",
    //   originalResourceID: originalProjectId,
    //   originalResourceName: originalProjectId,
    // };
    // await sendMessage(message, [resourceOwner], "Project cited");

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
  processId: string
) => {
  for (const relation of addRelationsArray) {
    await addRelationHandler(relation, processId, projectId);
  }
};

export const addDesignHandler = async (
  design: string,
  process: string,
  originalProjectId: string
) => {
  await addRelationHandler(design, process, originalProjectId);
};
