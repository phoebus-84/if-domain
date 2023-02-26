import { gql } from "graphql-request";
import { client } from "../graphql";

export const GET_USER_PUBLIC_KEY = gql`
  query GetUser($id: ID!) {
    person(id: $id) {
      eddsaPublicKey
    }
  }
`;

export type GetUserPublicKeyVariables = {
  id: string;
};

export type GetUserPublicKeyResponse = {
  person: {
    eddsaPublicKey: string;
  };
};

export const getUserPublicKey: (
  variables: GetUserPublicKeyVariables
) => Promise<string> = async (variables) => {
  const response: GetUserPublicKeyResponse = await client.request(
    GET_USER_PUBLIC_KEY,
    variables
  );
  if (response.person.eddsaPublicKey === null) {
    throw new Error("User not found");
  }
  return response.person.eddsaPublicKey;
};
