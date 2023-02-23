import {gql} from 'graphql-request';


export const CREATE_LOCATION = gql`
  mutation CreateLocation($name: String!, $address: String!, $lat: Decimal!, $lng: Decimal!) {
    createSpatialThing(spatialThing: { name: $name, mappableAddress: $address, lat: $lat, long: $lng }) {
      spatialThing {
        id
        lat
        long
      }
    }
  }
`;

export const CREATE_PROCESS = gql`
  mutation CreateProcess($name: String!) {
    createProcess(process: { name: $name }) {
      process {
        id
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
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
      newInventoriedResource: { name: $name, note: $note, images: $images, repo: $repo, license: $license }
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

export const QUERY_PROJECT_TYPES = gql`
  query GetProjectTypes {
    instanceVariables {
      specs {
        specProjectDesign {
          id
          name
        }
        specProjectProduct {
          id
          name
        }
        specProjectService {
          id
          name
        }
      }
    }
  }
`;

export const CITE_PROJECT = gql`
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