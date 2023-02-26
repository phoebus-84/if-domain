import { gql } from "graphql-request";
import { client } from "../graphql";

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

export type CreateLocationVariables = {
  name: string;
  address: string;
  position: { lat: number; lng: number };
};

export type CreateLocationResponse = {
  data: {
    createSpatialThing: {
      spatialThing: {
        id: string;
        lat: number;
        long: number;
      };
    };
  };
};

export type CreateLocation = (
  variables: CreateLocationVariables
) => Promise<CreateLocationResponse>;

let createLocation: CreateLocation;

createLocation = async (variables) => {
  const { name, address, position } = variables;
  return await client.request(CREATE_LOCATION, {
    variables: {
      name: name,
      addr: address,
      lat: position.lat,
      lng: position.lng,
    },
  });
};

export default createLocation;
