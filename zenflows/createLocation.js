import { gql } from "graphql-request";
import { client } from "../graphql.js";

const CREATE_LOCATION = gql`
  mutation CreateLocation(
    $name: String!
    $address: String!
    $lat: Decimal!
    $lng: Decimal!
  ) {
    createSpatialThing(
      spatialThing: {
        name: $name
        mappableAddress: $address
        lat: $lat
        long: $lng
      }
    ) {
      spatialThing {
        id
        lat
        long
      }
    }
  }
`;

export const createLocation = async (name, address, { lat, lng }) => {
  return await client.request(CREATE_LOCATION, {
    variables: {
      name: name,
      addr: address,
      lat: lat,
      lng: lng,
    },
  });
};
