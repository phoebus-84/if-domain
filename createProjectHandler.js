import { client } from "./graphql.js";
import { CREATE_PROCESS, CREATE_PROJECT } from "./mutations.js";
export const handleProjectCreation = async ({
    formData,
    projectType,
    userId
}) => {
    console.log("create project", formData);
    let projectId;
    try {
      const processName = `creation of ${formData.main.title} by ${userId}`;
      const process = await client.request(CREATE_PROCESS, {name:processName});
      console.log("process", process);
      const processId = process.createProcess.process.id;

      let location;
      if (formData.location.location || formData.location.remote) {
        location = await handleCreateLocation(formData, projectType === "design");
      }

    //   const images = await prepFilesForZenflows(formData.images, getItem("eddsaPrivateKey"));

      const tags = formData.main.tags.length > 0 ? formData.main.tags : undefined;

    //   const linkedDesign = formData.linkedDesign ? formData.linkedDesign : null;

    //   if (linkedDesign) {
    //     await linkDesign({
    //       design: linkedDesign,
    //       process: processId,
    //       description: formData.main.description,
    //     });
    //   }

    //   for (const resource of formData.relations) {
    //     await addRelations({
    //       resource,
    //       description: formData.main.description,
    //       processId: processId,
    //       resourceName: formData.main.title,
    //     });
    //   }

      const variables = {
        resourceSpec: "pppp",
        process: processId,
        agent: userId,
        name: formData.main.title,
        note: formData.main.description,
        location: location?.id,
        oneUnit: "ONE",
        creationTime: new Date().toISOString(),
        repo: formData.main.link,
        license: "",
        tags,
        metadata: JSON.stringify({
          contributors: formData.contributors,
          licenses: formData.licenses,
          relations: formData.relations,
          declarations: formData.declarations,
        }),
      };

      // Create project
      const project = await client.request(CREATE_PROJECT,variables);
        console.log("pp",project);

      projectId = createProjectData?.createEconomicEvent.economicEvent.resourceInventoriedAs?.id;

      //economic system: points assignments
    //   addIdeaPoints(user.ulid, IdeaPoints.OnCreate);
    //   addStrengthsPoints(user!.ulid, StrengthsPoints.OnCreate);

    //   await addContributors({
    //     contributors: formData.contributors,
    //     processId: processId,
    //     title: formData.main.title,
    //     projectId: createProjectData!.createEconomicEvent.economicEvent.resourceInventoriedAs!.id,
    //     projectType,
    //   });

    //   await uploadImages(formData.images);
    } catch (e) {
      console.log(e);
    }
    return projectId;
  };
