'use server';
import { Mutation, MutationDeleteTodoItemArgs } from '@/gql/graphql';
import { gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';
import { getClient } from './getClient';

type DeleteTodoReturn = {
  message: string;
};

export const deleteTodo = async (token: string, prevState: DeleteTodoReturn, formData: FormData) => {
  const { client } = await getClient(token);
  const id = (formData.get('id') as string) ?? '';
  const todo = (formData.get('todo') as string) ?? '';

  const variables: MutationDeleteTodoItemArgs = {
    input: {
      id,
    },
  };
  const res = await client.request<Mutation, MutationDeleteTodoItemArgs>(
    gql`
      mutation deleteTodoItem($input: DeleteTodoByIdInput!) {
        deleteTodoItem(input: $input) {
          success
        }
      }
    `,
    variables
  );
  revalidatePath('/todo');
  if (res) {
    return { message: `Deleted ${todo}` };
  }
  return { message: `Failed to delete` };
};
