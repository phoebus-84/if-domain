import { client } from "../graphql.js";
import { CREATE_PROCESS, QUERY_PROJECT_TYPES } from "../mutations.js";
import createProject from "../zenflows/createProject.js";
import { addRelationHandler } from "./addRelationHandler.js";
import createLocationHandler from "./createLocationHandler.js";

const queryProjectType = async () => {
  return await client.request(QUERY_PROJECT_TYPES);
};

export const handleProjectCreation = async ({
  formData,
  projectType,
  userId,
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
      agent: "0637V2EY26ZPWK87EZMJTF0034",
      name: formData.main.title,
      note: formData.main.description,
      location: location?.id,
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
    console.log("project created", project);

    projectId =
      project?.createEconomicEvent.economicEvent.resourceInventoriedAs?.id;

    const linkedDesign = formData.linkedDesign ? formData.linkedDesign : null;
    if (linkedDesign) {
      await addDesignHandler(linkedDesign, processId, projectId);
    }

    for (const resource of formData.relations) {
      await addRelationHandler(resource, processId, projectId);
    }

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
