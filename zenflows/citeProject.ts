import { gql } from "graphql-request";
import { client } from "../graphql";

const CITE_PROJECT = gql`
  mutation citeProject(
    $agent: ID!
    $creationTime: DateTime!
    $resource: ID! # EconomicResource.id
    $process: ID! # Process.id
    $unitOne: ID! # Unit.id
  ) {
    createEconomicEvent(
      event: {
        action: "cite"
        inputOf: $process
        provider: $agent
        receiver: $agent
        hasPointInTime: $creationTime
        resourceInventoriedAs: $resource
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      economicEvent {
        id
      }
    }
  }
`;

export type CiteProjectVariables = {
  agent: string;
  creationTime: string;
  resource: string;
  process: string;
  unitOne: string;
};

export type CiteProjectResponse = {
  createEconomicEvent: {
    economicEvent: {
      id: string;
    };
  };
};

export const citeProject = async (variables: CiteProjectVariables) => {
  const response: CiteProjectResponse = await client.request(
    CITE_PROJECT,
    variables
  );
  return response;
};
export const addRelations = async (projects: CiteProjectVariables[]) => {
  for (const project of projects) {
    await citeProject(project);
  }
};

export const addRelation = citeProject;
export default citeProject;
