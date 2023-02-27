import { ProjectMetadata } from "./../zenflows/createProject";
import { getProjectForMetadataUpdate } from "./../zenflows/project";
const verifyOwnership = async (projectId: string, userId: string) => {
  const project: ProjectMetadata = await getProjectForMetadataUpdate(projectId);
  if (!project) {
    return [false, "Project not found"];
  }
  if (project.primaryAccountable.id !== userId) {
    return [false, "User is not the primary accountable for this project"];
  }
  return [true, "User is the primary accountable for this project"];
};

export default verifyOwnership;
