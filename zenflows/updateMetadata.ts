import { gql } from "graphql-request";
import { client } from "../graphql";

const UPDATE_METADATA = gql`
  mutation updateMetadata(
    $process: ID!
    $agent: ID!
    $resource: ID!
    $quantity: IMeasure!
    $now: DateTime!
    $metadata: JSONObject!
  ) {
    accept: createEconomicEvent(
      event: {
        action: "accept"
        inputOf: $process
        provider: $agent
        receiver: $agent
        resourceInventoriedAs: $resource
        resourceQuantity: $quantity
        hasPointInTime: $now
      }
    ) {
      economicEvent {
        id
      }
    }
    modify: createEconomicEvent(
      event: {
        action: "modify"
        outputOf: $process
        provider: $agent
        receiver: $agent
        resourceInventoriedAs: $resource
        resourceQuantity: $quantity
        resourceMetadata: $metadata
        hasPointInTime: $now
      }
    ) {
      economicEvent {
        id
      }
    }
  }
`;

type UpdateMetadataMutationVariables = {
  process: string;
  agent: string;
  resource: string;
  quantity: {
    hasNumericalValue: number;
    hasUnit: string;
  };
  now: string;
  metadata: any;
};

const updateMetadata = (v: {
  userId: string;
  processId: string;
  projectId: string;
  metadata: any;
  quantity?: any;
}) => {
  const variables: UpdateMetadataMutationVariables = {
    process: v.processId,
    agent: v.userId,
    resource: v.projectId,
    quantity: v.quantity || {
      hasNumericalValue: 1,
      hasUnit: process.env.UNIT_ONE!,
    },
    now: new Date().toISOString(),
    metadata: v.metadata,
  };
  return client.request(UPDATE_METADATA, variables);
};

export default updateMetadata;
