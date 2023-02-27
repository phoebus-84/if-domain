import { gql } from "graphql-request";
import { client } from "../graphql";

const FORK_PROJECT = gql`
  mutation ForkProject(
    $agent: ID! # Agent.id
    $creationTime: DateTime!
    $resource: ID! # EconomicResource.id
    $process: ID! # Process.id
    $unitOne: ID! # Unit.id
    $tags: [URI!]
    $location: ID # SpatialThing.id
    $spec: ID! # ResourceSpecification.id
    $name: String!
    $note: String
    $repo: String
    $metadata: JSONObject
  ) {
    cite: createEconomicEvent(
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
    produce: createEconomicEvent(
      event: {
        action: "produce"
        outputOf: $process
        provider: $agent
        receiver: $agent
        hasPointInTime: $creationTime
        resourceClassifiedAs: $tags
        resourceConformsTo: $spec
        toLocation: $location
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
        resourceMetadata: $metadata
      }
      newInventoriedResource: { name: $name, note: $note, repo: $repo }
    ) {
      economicEvent {
        id
        resourceInventoriedAs {
          id
          name
        }
      }
    }
  }
`;

export type ForkProjectVariables = {
  agent: string;
  creationTime: string;
  resource: string;
  process: string;
  unitOne: string;
  tags: string[];
  location: string;
  spec: string;
  name: string;
  note: string;
  repo: string;
  metadata: string;
};

export const forkProject = async (variables: ForkProjectVariables) => {
  const data = await client.request(FORK_PROJECT, variables);
  if (!data) throw new Error("Project not forked");
  return data?.produce.economicEvent.resourceInventoriedAs.id;
};
