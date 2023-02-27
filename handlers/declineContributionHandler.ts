import { queryProposal, rejectProposal } from "../zenflows/proposal";
import sendMessage, { MessageSubject } from "./sendMessageHandler";

const declineContributionHandler = async (
  proposalId: string,
  userId: string,
) => {
  try {
    const proposal = await queryProposal(proposalId);
    if (!proposal) throw new Error("Proposal not found");
    const intents = proposal.primaryIntents;
    if (!intents) throw new Error("Proposal has no intents");
    const rejectProposalVariables = {
      intentCite: intents[0].id,
      intentAccept: intents[1].id,
      intentModify: intents[2].id,
    };
    const rejection = await rejectProposal(rejectProposalVariables);

    const message = {
      originalResourceID:
        proposal.primaryIntents![0].resourceInventoriedAs?.id || "",
      proposalID: proposal.id,
      text: "",
    };

    await sendMessage(
      message,
      [
        proposal.primaryIntents![0].resourceInventoriedAs!.primaryAccountable
          .id,
      ],
      MessageSubject.CONTRIBUTION_REJECTED,
      userId
    );
    return rejection;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default declineContributionHandler;
