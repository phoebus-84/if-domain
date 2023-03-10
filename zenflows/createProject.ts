import { gql } from "graphql-request";
import { client } from "../graphql";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $note: String!
    $metadata: JSONObject
    $agent: ID!
    $creationTime: DateTime!
    $location: ID
    $tags: [URI!]
    $resourceSpec: ID!
    $oneUnit: ID!
    $images: [IFile!]
    $repo: String
    $process: ID!
    $license: String!
  ) {
    createEconomicEvent(
      event: {
        action: "produce"
        provider: $agent
        receiver: $agent
        outputOf: $process
        hasPointInTime: $creationTime
        resourceClassifiedAs: $tags
        resourceConformsTo: $resourceSpec
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $oneUnit }
        toLocation: $location
        resourceMetadata: $metadata
      }
      newInventoriedResource: {
        name: $name
        note: $note
        images: $images
        repo: $repo
        license: $license
      }
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
export type IFile = any;

export type ProjectMetadata = any;

export type CreateProjectVariables = {
  name: string;
  note: string;
  metadata: ProjectMetadata;
  agent: string;
  creationTime: string;
  location?: string;
  tags: string[];
  resourceSpec: string;
  oneUnit: string;
  images?: IFile[];
  repo: string;
  process: string;
  license: string;
};

const createProject = async (variables: CreateProjectVariables) => {
  return await client.request(CREATE_PROJECT, variables);
};

export default createProject;
