"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER_PUBLIC_KEY = void 0;
const graphql_request_1 = require("graphql-request");
exports.GET_USER_PUBLIC_KEY = (0, graphql_request_1.gql) `
  query GetUser($id: ID!) {
    person(id: $id) {
        eddsaPublicKey
    }
  }
`;
