import {
  acceptProposal,
  queryProposal,
  satisfyIntents,
} from "../zenflows/proposal";
import {
  addIdeaPoints,
  addStrengthsPoints,
  IdeaPoints,
  StrengthsPoints,
} from "./addPointsHandler";
import sendMessage, { MessageSubject } from "./sendMessageHandler";

const acceptContributionHandler = async (
  proposalId: string,
  userId: string
) => {
  try {
    const proposal = await queryProposal(proposalId);
    if (!proposal) throw new Error("Proposal not found");
    const intents = proposal.primaryIntents;
    if (!intents) throw new Error("Proposal has no intents");

    const intentCite = intents[0];
    const intentAccept = intents[1];
    const intentModify = intents[2];

    const acceptanceVariables = {
      process: intentCite.inputOf?.id,
      owner: userId,
      proposer: intentCite.resourceInventoriedAs?.primaryAccountable.id,
      resourceForked: intentCite.resourceInventoriedAs?.id,
      resourceOrigin: intentAccept.resourceInventoriedAs?.id,
    };
    const economicEvents = await acceptProposal(acceptanceVariables);

    const satisfyIntentsVariables = {
      unitOne: "one",
      intentCited: intentCite.id,
      intentAccepted: intentAccept.id,
      intentModify: intentModify.id,
      eventCite: economicEvents.cite.economicEvent.id,
      eventAccept: economicEvents.accept.economicEvent.id,
      eventModify: economicEvents.modify.economicEvent.id,
    };
    const intentsSatisfied = await satisfyIntents(satisfyIntentsVariables);
    if (!intentsSatisfied) throw new Error("Intents not satisfied");

    const message = {
      originalResourceID:
        proposal.primaryIntents![0].resourceInventoriedAs?.id || "",
      proposalID: proposal.id,
      text: "proposal.note",
    };
    await sendMessage(
      message,
      [
        proposal.primaryIntents![0].resourceInventoriedAs!.primaryAccountable
          .id,
      ],
      MessageSubject.CONTRIBUTION_ACCEPTED,
      userId
    );

    //economic system: points assignments
    addStrengthsPoints(
      proposal.primaryIntents![0].resourceInventoriedAs!.primaryAccountable.id,
      IdeaPoints.OnAccept
    );
    addIdeaPoints(userId, StrengthsPoints.OnAccept);
  } catch (error) {
    console.error(error);
  }
};

export default acceptContributionHandler;
