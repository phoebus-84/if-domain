import { gql } from "graphql-request";
import { client } from "../graphql.js";

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

export const citeProject = async (variables) => {
  return await client.request(CITE_PROJECT, variables);
};
export const addRelations = async (projects) => {
  for (const project of projects) {
    await citeProject(project);
  }
};

export default citeProject;
