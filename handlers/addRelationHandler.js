import { citeProject } from "../zenflows/citeProject.js";
export const addRelationHandler = async (projectId, processId, originalProjectId) => {
    const citeVariables = {
      agent: "0637V2EY26ZPWK87EZMJTF0034",
      resource: projectId,
      process: processId,
      creationTime: new Date().toISOString(),
      unitOne: "0637V2ZFFM4ZHZPSVNYNCBAW94",
    };
    try {
      await citeProject(citeVariables);
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
      console.error(e);
    }
  };

  export const addRelationsHandler = async (addRelationsArray) => {
    for (const relation of addRelationsArray) {
        await addRelationHandler(relation.projectId, relation.processId, relation.originalProjectId);
    }
}
  
  export const addDesignHandler = async ({ design, process, originalProjectId }) => {
    await addRelation(design, process, originalProjectId);
  };