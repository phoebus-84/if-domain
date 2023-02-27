import signedFetch from "../rest";

export interface AddedAsContributorNotification {
  projectOwnerId: string;
  text: string;
  resourceName: string;
  resourceID: string;
  ownerName?: string;
  projectOwnerName?: string;
}

export enum MessageSubject {
    CONTRIBUTION_REQUEST = "contributionRequest",
    CONTRIBUTION_ACCEPTED = "contributionAccepted",
    CONTRIBUTION_REJECTED = "contributionRejected",
    ADDED_AS_CONTRIBUTOR = "addedAsContributor",
    PROJECT_CITED = "Project cited",
  }

const sendMessage = async (
  message: any,
  receivers: string[],
  subject: string = "Subject",
  userId: string
): Promise<Response> => {
  const request = {
    sender: userId,
    receivers: ["0634YMEGWHNGCVVBKETRXJQCWM"],
    content: {
      message: message,
      subject: subject,
      data: new Date().toISOString(),
    },
  };
  return await signedFetch(process.env.NEXT_PUBLIC_INBOX_SEND || "https://gateway0.interfacer.dyne.org/inbox/send", request);
};

export default sendMessage;
