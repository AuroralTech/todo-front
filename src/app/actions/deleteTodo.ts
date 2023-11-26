'use server';
import { Mutation, MutationDeleteTodoItemArgs } from '@/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

type DeleteTodoReturn = {
  message: string;
};

export const deleteTodo = async (prevState: DeleteTodoReturn, formData: FormData) => {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);
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
