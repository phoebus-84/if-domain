import {gql} from 'graphql-request';

export const CREATE_PROCESS = gql`
  mutation CreateProcess($name: String!) {
    createProcess(process: { name: $name }) {
      process {
        id
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

