import { gql } from "graphql-request";
import { client } from "../graphql";

const QUERY_PROJECT_FOR_METADATA_UPDATE = gql`
  query queryProjectForMetadataUpdate($id: ID!) {
    economicResource(id: $id) {
      id
      name
      metadata
      onhandQuantity {
        hasUnit {
          id
          symbol
          label
        }
        hasNumericalValue
      }
      accountingQuantity {
        hasUnit {
          id
          label
          symbol
        }
        hasNumericalValue
      }
      primaryAccountable {
        id
      }
    }
  }
`;


export type QueryProjectForMetadataUpdateResponse = {
  economicResource: {
    id: string;
    name: string;
    metadata: any;
    onhandQuantity: {
      hasUnit: {
        id: string;
        symbol: string;
        label: string;
      };
      hasNumericalValue: number;
    };
    accountingQuantity: {
      hasUnit: {
        id: string;
        label: string;
        symbol: string;
      };
      hasNumericalValue: number;
    };
    primaryAccountable: {
      id: string;
    };
  };
};

export const getProjectForMetadataUpdate = async (id: string) => {
  const response = await client.request(QUERY_PROJECT_FOR_METADATA_UPDATE, {
    id: id,
  });
  return response.economicResource;
};
