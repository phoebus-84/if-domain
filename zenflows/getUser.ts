import { gql } from "graphql-request";

export const GET_USER_PUBLIC_KEY = gql`
  query GetUser($id: ID!) {
    person(id: $id) {
        eddsaPublicKey
    }
  }
`;

export type GetUserVariables = {
    id: string;
};

export type GetUserResponse = {
    person: {
        eddsaPublicKey: string;
    };
};  


