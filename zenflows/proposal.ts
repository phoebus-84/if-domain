import { gql } from "graphql-request";
import { client } from "../graphql";

const CREATE_PROPOSAL = gql`
  mutation CreateProposal($name: String!, $note: String!) {
    createProposal(proposal: { name: $name, note: $note }) {
      proposal {
        id
      }
    }
  }
`;

export const createProposal = async (variables: {
  name: string;
  note: string;
}) => {
  const data = await client.request(CREATE_PROPOSAL, variables);
  if (!data) throw new Error("Proposal not created");
  return data?.createProposal.proposal.id;
};

const PROPOSE_CONTRIBUTION = gql`
  mutation proposeContribution(
    $process: ID!
    $owner: ID!
    $proposer: ID!
    $creationTime: DateTime!
    $resourceForked: ID!
    $unitOne: ID!
    $resourceOrigin: ID!
  ) {
    citeResourceForked: createIntent(
      intent: {
        action: "cite"
        inputOf: $process
        provider: $proposer
        hasPointInTime: $creationTime
        resourceInventoriedAs: $resourceForked
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      intent {
        id
      }
    }
    acceptResourceOrigin: createIntent(
      intent: {
        action: "accept"
        inputOf: $process
        receiver: $owner
        hasPointInTime: $creationTime
        resourceInventoriedAs: $resourceOrigin
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      intent {
        id
      }
    }
    modifyResourceOrigin: createIntent(
      intent: {
        action: "modify"
        outputOf: $process
        receiver: $owner
        hasPointInTime: $creationTime
        resourceInventoriedAs: $resourceOrigin
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      intent {
        id
      }
    }
  }
`;

export type ProposeContributionVariables = {
  process: string;
  owner: string;
  proposer: string;
  creationTime: string;
  resourceForked: string;
  unitOne: string;
  resourceOrigin: string;
};

export const proposeContribution = async (
  variables: ProposeContributionVariables
) => {
  const data = await client.request(PROPOSE_CONTRIBUTION, variables);
  if (!data) throw new Error("Contribution not proposed");
  return data;
};

const LINK_CONTRIBUTION_PROPOSAL_INTENT = gql`
  mutation LinkContributionAndProposalAndIntent(
    $proposal: ID!
    $citeIntent: ID!
    $acceptIntent: ID!
    $modifyIntent: ID!
  ) {
    proposeCite: proposeIntent(publishedIn: $proposal, publishes: $citeIntent) {
      proposedIntent {
        id
      }
    }
    proposeAccept: proposeIntent(
      publishedIn: $proposal
      publishes: $acceptIntent
    ) {
      proposedIntent {
        id
      }
    }
    proposeModify: proposeIntent(
      publishedIn: $proposal
      publishes: $modifyIntent
    ) {
      proposedIntent {
        id
      }
    }
  }
`;

export type LinkContributionProposalIntentVariables = {
  proposal: string;
  citeIntent: string;
  acceptIntent: string;
  modifyIntent: string;
};

export const linkContributionProposalIntent = async (
  variables: LinkContributionProposalIntentVariables
) => {
  const data = await client.request(
    LINK_CONTRIBUTION_PROPOSAL_INTENT,
    variables
  );
  if (!data) throw new Error("Contribution not proposed");
  return data;
};

const ACCEPT_PROPOSAL = gql`
  mutation acceptProposal(
    $process: ID!
    $owner: ID!
    $proposer: ID!
    $unitOne: ID!
    $resourceForked: ID!
    $resourceOrigin: ID!
    $creationTime: DateTime!
  ) {
    cite: createEconomicEvent(
      event: {
        action: "cite"
        inputOf: $process
        provider: $proposer
        receiver: $owner
        resourceInventoriedAs: $resourceForked
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
        hasPointInTime: $creationTime
      }
    ) {
      economicEvent {
        id
      }
    }

    accept: createEconomicEvent(
      event: {
        action: "accept"
        inputOf: $process
        provider: $owner
        receiver: $owner
        resourceInventoriedAs: $resourceOrigin
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
        hasPointInTime: $creationTime
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
        provider: $owner
        receiver: $owner
        resourceInventoriedAs: $resourceOrigin
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
        hasPointInTime: $creationTime
      }
    ) {
      economicEvent {
        id
      }
    }
  }
`;

export type AcceptProposalVariables = {
  process: string;
  owner: string;
  proposer: string;
  unitOne: string;
  resourceForked: string;
  resourceOrigin: string;
  creationTime: string;
};

export type AcceptProposalResponse = {
  cite: {
    economicEvent: {
      id: string;
    };
  };
  accept: {
    economicEvent: {
      id: string;
    };
  };
  modify: {
    economicEvent: {
      id: string;
    };
  };
};

export const acceptProposal = async (v: Partial<AcceptProposalVariables>) => {
  const variables = {
    process: v.process,
    owner: v.owner,
    proposer: v.proposer,
    unitOne: "One", //get unit
    resourceForked: v.resourceForked,
    resourceOrigin: v.resourceOrigin,
    creationTime: new Date().toISOString(),
  };
  const data = await client.request<AcceptProposalResponse>(ACCEPT_PROPOSAL, variables);
  if (!data) throw new Error("Proposal not accepted");
  return data;
};

const SATISFY_INTENTS = gql`
  mutation satisfyIntents(
    $unitOne: ID!
    $intentCited: ID!
    $intentAccepted: ID!
    $intentModify: ID!
    $eventCite: ID!
    $eventAccept: ID!
    $eventModify: ID!
  ) {
    cite: createSatisfaction(
      satisfaction: {
        satisfies: $intentCited
        satisfiedByEvent: $eventCite
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      satisfaction {
        id
      }
    }

    accept: createSatisfaction(
      satisfaction: {
        satisfies: $intentAccepted
        satisfiedByEvent: $eventAccept
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      satisfaction {
        id
      }
    }

    modify: createSatisfaction(
      satisfaction: {
        satisfies: $intentModify
        satisfiedByEvent: $eventModify
        resourceQuantity: { hasNumericalValue: 1, hasUnit: $unitOne }
      }
    ) {
      satisfaction {
        id
      }
    }
  }
`;

export type SatisfyIntentsVariables = {
  unitOne: string;
  intentCited: string;
  intentAccepted: string;
  intentModify: string;
  eventCite: string;
  eventAccept: string;
  eventModify: string;
};

export const satisfyIntents = async (v: Partial<SatisfyIntentsVariables>) => {
  const variables = {
    unitOne: "One", //get unit
    intentCited: v.intentCited,
    intentAccepted: v.intentAccepted,
    intentModify: v.intentModify,
    eventCite: v.eventCite,
    eventAccept: v.eventAccept,
    eventModify: v.eventModify,
  };
  const data = await client.request(SATISFY_INTENTS, variables);
  if (!data) throw new Error("Intents not satisfied");
  return data;
};

export const REJECT_PROPOSAL = gql`
  mutation rejectProposal(
    $intentCite: ID!
    $intentAccept: ID!
    $intentModify: ID!
  ) {
    cite: updateIntent(intent: { id: $intentCite, finished: true }) {
      intent {
        id
      }
    }
    accept: updateIntent(intent: { id: $intentAccept, finished: true }) {
      intent {
        id
      }
    }
    modify: updateIntent(intent: { id: $intentModify, finished: true }) {
      intent {
        id
      }
    }
  }
`;

export type RejectProposalVariables = {
  intentCite: string;
  intentAccept: string;
  intentModify: string;
};

export const rejectProposal = async (variables: RejectProposalVariables) => {
  const data = await client.request(REJECT_PROPOSAL, variables);
  if (!data) throw new Error("Proposal not rejected");
  return data;
};

const QUERY_PROPOSAL = gql`
  query QueryProposal($id: ID!) {
    proposal(id: $id) {
      id
      status
      primaryIntents {
        id
        provider {
          id
          name
        }
        receiver {
          id
          name
        }
        inputOf {
          name
          id
        }
        outputOf {
          id
          name
        }
        hasPointInTime
        resourceInventoriedAs {
          id
          primaryAccountable {
            id
          }
          onhandQuantity {
            hasNumericalValue
            hasUnit {
              id
            }
          }
        }
        resourceConformsTo {
          id
        }
      }
    }
  }
`;

export type QueryProposalResponse = {
  proposal: {
    id: string;
    status: string;
    primaryIntents: {
      id: string;
      provider: {
        id: string;
        name: string;
      };
      receiver: {
        id: string;
        name: string;
      };
      inputOf: {
        name: string;
        id: string;
      };
      outputOf: {
        id: string;
        name: string;
      };
      hasPointInTime: string;
      resourceInventoriedAs: {
        id: string;
        primaryAccountable: {
          id: string;
        };
        onhandQuantity: {
          hasNumericalValue: number;
          hasUnit: {
            id: string;
          };
        };
      };
      resourceConformsTo: {
        id: string;
      };
    }[];
  };
};

export const queryProposal = async (proposalId: string) => {
  const data = await client.request<QueryProposalResponse>(QUERY_PROPOSAL, {
    id: proposalId,
  });
  if (!data) throw new Error("Proposal not found");
  return data.proposal;
};
