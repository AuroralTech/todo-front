import { GraphQLClient } from 'graphql-request';

export const getClient = async (token: string) => {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);
  client.setHeader('Authorization', `Bearer ${token}`);
  return { client };
};
