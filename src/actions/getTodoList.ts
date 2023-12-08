import { Query } from 'firebase/database';
import { gql } from 'graphql-request';
import { getClient } from './getClient';
import { TodoList } from '@/gql/graphql';

export const getTodoList = async (token: string) => {
  const { client } = await getClient(token);
  const res = await client.request<{ todoList: TodoList }>(gql`
    {
      todoList {
        items {
          id
          task
          is_completed
        }
      }
    }
  `);
  return { res };
};
