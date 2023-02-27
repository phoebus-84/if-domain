import { client } from "../graphql";
import { CREATE_PROCESS, QUERY_PROJECT_TYPES } from "../mutations";
import createProject from "../zenflows/createProject";
import addContributorsHandler from "./addContributorsHandler";
import { addIdeaPoints, addStrengthsPoints, IdeaPoints, StrengthsPoints } from "./addPointsHandler";
import { addRelationHandler } from "./addRelationHandler";
import createLocationHandler from "./createLocationHandler";

const queryProjectType = async () => {
  return await client.request(QUERY_PROJECT_TYPES);
};

export const handleProjectCreation = async ({
  formData,
  projectType,
  userId,
}:
{
  formData: any;
  projectType: string;
  userId: string;
}) => {
  const queryProjectTypes = await queryProjectType();
  const specs = queryProjectTypes.data?.instanceVariables.specs;
  const projectTypes = specs && {
    Design: specs.specProjectDesign.id,
    Service: specs.specProjectService.id,
    Product: specs.specProjectProduct.id,
  };
  console.log("create project", formData, specs);
  let projectId;
  try {
    const processName = `creation of ${formData.main.title} by ${userId}`;
    const process = await client.request(CREATE_PROCESS, { name: processName });
    const processId = process.createProcess.process.id;
    let location;
    if (formData.location.location || formData.location.remote) {
      location = await createLocationHandler(
        formData,
        projectType === "Design"
      );
    }

    //   const images = await prepFilesForZenflows(formData.images, getItem("eddsaPrivateKey"));

    const tags = formData.main.tags.length > 0 ? formData.main.tags : undefined;

    const variables = {
      resourceSpec: "0637TVG24ZA29N7KRV2NPK7NBC",
      process: processId,
      // agent:userId,
      agent: "0637V2EY26ZPWK87EZMJTF0034",
      name: formData.main.title,
      note: formData.main.description,
      location: location?.spatialThing?.id,
      oneUnit: "0637V2ZFFM4ZHZPSVNYNCBAW94",
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
    const project = await createProject(variables);
    if (project.errors) return project.errors;
    console.log("project created", JSON.stringify(project));

    projectId =
      project?.createEconomicEvent.economicEvent.resourceInventoriedAs?.id;

    const linkedDesign = formData.linkedDesign ? formData.linkedDesign : null;
    if (linkedDesign) {
      await addRelationHandler(linkedDesign, processId, projectId);
    }

    for (const resource of formData.relations) {
      await addRelationHandler(resource, processId, projectId);
    }

    await addContributorsHandler(projectId, formData.contributors, processId, userId);

     await addIdeaPoints(userId, IdeaPoints.OnCreate);
     await addStrengthsPoints(userId, StrengthsPoints.OnCreate);

    //   await uploadImages(formData.images);
  } catch (e) {
    console.log(e);
  }
  return projectId;
};
