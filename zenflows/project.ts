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

export interface QueryProjectForMetadataUpdateResponse {
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
}

export const getProjectForMetadataUpdate = async (id: string) => {
  const response = await client.request<QueryProjectForMetadataUpdateResponse>(
    QUERY_PROJECT_FOR_METADATA_UPDATE,
    {
      id: id,
    }
  );
  return response.economicResource;
};

const QUERY_RESOURCE = gql`
  query getResource($id: ID!) {
    economicResource(id: $id) {
      id
      name
      note
      metadata
      license
      classifiedAs
      repo
      currentLocation {
        id
      }
      conformsTo {
        id
      }
      onhandQuantity {
        hasUnit {
          id
        }
        hasNumericalValue
      }
      primaryAccountable {
        id
      }
    }
  }
`;

export type QueryResourceResponse = {
  economicResource: {
    id: string;
    name: string;
    note: string;
    metadata: any;
    license: string;
    classifiedAs: string[];
    repo: string;
    currentLocation: {
      id: string;
    };
    conformsTo: {
      id: string;
    };
    onhandQuantity: {
      hasUnit: {
        id: string;
      };
      hasNumericalValue: number;
    };
    primaryAccountable: {
      id: string;
    };
  };
};

export const getResource = async (id: string) => {
  const response: QueryResourceResponse = await client.request(QUERY_RESOURCE, {
    id: id,
  });
  return response.economicResource;
};

const TRANSFER_PROJECT = gql`
  mutation TransferProject (
    $resource: ID!
    $name: String!
    $note: String!
    $metadata: JSONObject
    $agent: ID!
    $creationTime: DateTime!
    $location: ID!
    $tags: [URI!]
    $oneUnit: ID!
  ) {
    createEconomicEvent(
      event: {
        resourceInventoriedAs: $resource
        action: "transfer"
        provider: "${process.env.NEXT_PUBLIC_LOSH_ID}"
        receiver: $agent
        hasPointInTime: $creationTime
        resourceClassifiedAs: $tags
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $oneUnit }
        toLocation: $location
        resourceMetadata: $metadata
      }
      newInventoriedResource: { name: $name, note: $note}
    ) {
      economicEvent {
        id
        toResourceInventoriedAs {
          id
          name
        }
      }
    }
  }
`;

export type TransferProjectVariables = {
  resource: string;
  agent: string;
  name: string;
  note: string;
  metadata: any;
  location?: string;
  oneUnit: string;
  creationTime: string;
  tags: string[];
};

export type TransferProjectResponse = {
  createEconomicEvent: {
    economicEvent: {
      id: string;
      toResourceInventoriedAs: {
        id: string;
        name: string;
      };
    };
  };
};

export const transferProject = async (variables: TransferProjectVariables) => {
  try {
    const response: TransferProjectResponse = await client.request(
      TRANSFER_PROJECT,
      variables
    );
    return {
      projectId:
        response.createEconomicEvent.economicEvent.toResourceInventoriedAs.id,
      errors: undefined,
    };
  } catch (e) {
    return { projectId: undefined, errors: e };
  }
};
