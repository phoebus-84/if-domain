import { gql } from "graphql-request";
import { client } from "../graphql";

const CREATE_PROCESS = gql`
  mutation CreateProcess($name: String!) {
    createProcess(process: { name: $name }) {
      process {
        id
      }
    }
  }
`;

const createProcess = async (name: string) => {
  const process = await client.request(CREATE_PROCESS, { name });
  return process.createProcess.process.id;
};

export default createProcess;
