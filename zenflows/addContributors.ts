import { gql } from "graphql-request";
import { client } from "../graphql";

export const CONTRIBUTE_TO_PROJECT = gql`
  mutation contributeToProject(
    $agent: ID! # Agent.id
    $creationTime: DateTime!
    $process: ID! # Process.id
    $unitOne: ID! # Unit.id
    $conformsTo: ID!
  ) {
    createEconomicEvent(
      event: {
        action: "work"
        inputOf: $process
        provider: $agent
        receiver: $agent
        resourceConformsTo: $conformsTo
        hasPointInTime: $creationTime
        effortQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      economicEvent {
        id
      }
    }
  }
`;

export type ContributeToProjectVariables = {
  agent: string;
  creationTime: string;
  process: string;
  unitOne: string;
  conformsTo: string;
};

export type ContributeToProjectResponse = {
  createEconomicEvent: {
    economicEvent: {
      id: string;
    };
  };
};

let contributeToProject: (
  variables: ContributeToProjectVariables
) => Promise<{ errors?: unknown; event?: string }>;

contributeToProject = async (variables: ContributeToProjectVariables) => {
  try {
    const response = await client.request<ContributeToProjectResponse>(
      CONTRIBUTE_TO_PROJECT,
      variables
    );
    return { event: response.createEconomicEvent.economicEvent.id };
  } catch (e) {
    return { errors: e };
  }
};

export default contributeToProject;
