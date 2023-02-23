import {GraphQLClient} from 'graphql-request';
import {CREATE_LOCATION} from './mutations.js';

const endpoint = 'http://65.109.11.42:10000/api'

const headers = {
  Authorization: 'Bearer my-access-token',
  'Custom-Header': 'some-value',
}
export const client = new GraphQLClient(endpoint, { headers })
