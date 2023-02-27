import { arrayEquals, getNewElements } from "../tools/arrayOperations";
import createProcess from "../zenflows/createProcces";
import { getProjectForMetadataUpdate } from "../zenflows/project";
import updateMetadata from "../zenflows/updateMetadata";
import addContributorsHandler from "./addContributorsHandler";
import { addRelationsHandler } from "./addRelationHandler";

const updateMetadataHandler = async (
  project: any,
  metadata: Record<string, unknown>,
  processId: string,
  userId: string
) => {
  if (project.primaryAccountable?.id !== userId)
    throw new Error("NotAuthorized");
  const newMetadata = { ...project.metadata, ...metadata };
  const quantity = project.accountingQuantity;
  const variables = {
    processId: processId,
    metadata: newMetadata,
    agent: userId,
    now: new Date().toISOString(),
    resource: project.id!,
    quantity: {
      hasNumericalValue: quantity?.hasNumericalValue,
      hasUnit: quantity?.hasUnit?.id,
    },
    userId: userId,
    projectId: project.id!,
  };
  const { errors } = await updateMetadata(variables);
  if (errors) throw new Error(`Metadata not updated: ${errors}`);
};

type CbUpdateFunction = (
  projectId: string,
  array: Array<string>,
  processId: string,
  userId: string
) => Promise<void>;


const updateMetadataArray = async (
  projectId: string,
  array: string[],
  key: string,
  cb: CbUpdateFunction,
  userId: string
) => {
  try {
    const project = await getProjectForMetadataUpdate(projectId);
    const oldArray = project.metadata[key];
    if (arrayEquals(oldArray, array)) return;
    const processName = `${key} update @ ${project.name}`;
    const processId = await createProcess(processName);
    const newArray = getNewElements(project.metadata[key], array);
    if (newArray.length > 0) await cb(projectId, newArray, processId, userId);
    await updateMetadata({
      projectId,
      metadata: { [key]: array },
      processId,
      userId,
    });
  } catch (e) {
    throw e;
  }
};


export const updateLicenses = async (
  projectId: string,
  licenses: Array<{ scope: string; licenseId: string }>,
  userId: string
) => {
  try {
    const project = await getProjectForMetadataUpdate(projectId);
    const processId = await createProcess(`licenses update @ ${project.name}`);
    const metadata = await updateMetadataHandler(
      projectId,
      {licenses},
      processId,
      userId
    );
    console.log("metadata", metadata);
  } catch (e) {
    throw e;
  }
};

export const updateDeclarations = async (
  projectId: string,
  declarations: any,
  userId: string
) => {
  try {
    const project = await getProjectForMetadataUpdate(projectId);
    const processId = await createProcess(
      `declarations update @ ${project.name}`
    );
    await updateMetadataHandler(
      projectId,
      declarations,
      processId,
      userId
    );
  } catch (e) {
    throw e;
  }
};

export const updateContributors = async (
  projectId: string,
  contributors: string[],
  userId: string
) => {
  try {
    await updateMetadataArray(
      projectId,
      contributors,
      "contributors",
      addContributorsHandler,
      userId
    );
  } catch (e) {
    throw e;
  }
}

export const updateRelations = async (
  projectId: string,
  relations: string[],
  userId: string
) => {
  try {
    await updateMetadataArray(
      projectId,
      relations,
      "relations",
      addRelationsHandler,
      userId
    );
  } catch (e) {
    throw e;
  }
}




