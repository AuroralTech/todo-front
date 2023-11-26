'use server';
import { Mutation, MutationDeleteTodoItemArgs, MutationUpdateTodoStatusArgs } from '@/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

type UpdateTodoReturn = {
  message: string;
};

export const updateTodo = async (prevState: UpdateTodoReturn, formData: FormData) => {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);
  const id = (formData.get('id') as string) ?? '';
  const task = (formData.get('task') as string) ?? '';
  const is_completed = (formData.get('is_completed') as string) ?? '';
  console.log(is_completed);

  let is_completed_bool = true;
  if (is_completed === 'true') {
    is_completed_bool = false;
  }

  const variables: MutationUpdateTodoStatusArgs = {
    input: {
      id,
      is_completed: is_completed_bool,
    },
  };
  const res = await client.request<Mutation, MutationUpdateTodoStatusArgs>(
    gql`
      mutation updateTodoStatus($input: UpdateTodoStatusInput!) {
        updateTodoStatus(input: $input) {
          success
        }
      }
    `,
    variables
  );
  revalidatePath('/todo');
  if (res) {
    return { message: `Updated ${task}` };
  }
  return { message: `Failed to update` };
};
