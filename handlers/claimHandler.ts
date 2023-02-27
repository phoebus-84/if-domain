import { getResource, transferProject } from "./../zenflows/project";
import createLocationHandler from "./createLocationHandler";

const claimHandler = async (resourceId: string, userId: string, data: any) => {
  const resource = await getResource(resourceId);
  if (!resource) throw new Error("Osh resource not found");
  if (resource.primaryAccountable.id !== process.env.LOSH_ID) throw new Error("Resource already claimed");

  const location = await createLocationHandler(data.location, true);
  const tags = data.tags;
  const contributors = data.contributors;
  const metadata = JSON.stringify({
    ...resource.metadata,
    repositoryOrId: resource.metadata.repo,
    contributors: contributors,
  });

  const variables = {
    resource: resource.id,
    agent: userId,
    name: resource.name,
    note: resource.note || "",
    metadata: metadata,
    location: location?.st?.id,
    oneUnit: resource.onhandQuantity.hasUnit!.id,
    creationTime: new Date().toISOString(),
    tags: tags.length > 0 ? tags : undefined,
  };

  //transfer project
  const {projectId, errors} = await transferProject(variables);
  if (errors) throw new Error(`ProjectNotTransfered: ${errors}`);

  // TODO: Send message
  // TODO: Assign points

  // Redirecting user
  return projectId;
};

export default claimHandler;
