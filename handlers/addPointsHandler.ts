import signedFetch from "../rest";
export enum Token {
  Idea = "idea",
  Strengths = "strengths",
}
export type AddIdeaPoints = (id: string, amount?: number) => Promise<Response>;
export type AddStrengthsPoints = (
  id: string,
  amount?: number
) => Promise<Response>;

export enum IdeaPoints {
  OnFork = Number(process.env.IDEA_POINTS_ON_FORK) || 100,
  OnCreate = Number(process.env.IDEA_POINTS_ON_CREATE) || 100,
  OnContributions = Number(process.env.IDEA_POINTS_ON_CONTRIBUTIONS) || 100,
  OnStar = Number(process.env.IDEA_POINTS_ON_STAR) || 10,
  OnWatch = Number(process.env.IDEA_POINTS_ON_WATCH) || 10,
  OnAccept = Number(process.env.IDEA_POINTS_ON_ACCEPT) || 100,
  OnCite = Number(process.env.IDEA_POINTS_ON_CITE) || 100,
}
export enum StrengthsPoints {
  OnFork = Number(process.env.STRENGTHS_POINTS_ON_FORK) || 100,
  OnCreate = Number(process.env.STRENGTHS_POINTS_ON_CREATE) || 100,
  OnContributions = Number(process.env.STRENGTHS_POINTS_ON_CONTRIBUTIONS) || 100,
  OnStar = Number(process.env.STRENGTHS_POINTS_ON_STAR) || 10,
  OnWatch = Number(process.env.STRENGTHS_POINTS_ON_WATCH) || 10,
  OnAccept = Number(process.env.STRENGTHS_POINTS_ON_ACCEPT) || 100,
  OnCite = Number(process.env.STRENGTHS_POINTS_ON_CITE) || 100,
}

const addPoints = async (
  amount = 1,
  id: string,
  token: Token
): Promise<Response> => {
  const request = {
    token: token,
    amount: amount,
    owner: id,
  };

  return await signedFetch(process.env.WALLET_ENDPOINT!, request);
};

export const addIdeaPoints: AddIdeaPoints = async (id, amount) => {
  return await addPoints(amount, id, Token.Idea);
};

export const addStrengthsPoints: AddStrengthsPoints = async (id, amount) => {
  return await addPoints(amount, id, Token.Strengths);
};
