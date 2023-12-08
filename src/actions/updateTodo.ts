'use server';
import { Mutation, MutationUpdateTodoStatusArgs } from '@/gql/graphql';
import { gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';
import { getClient } from './getClient';

type UpdateTodoReturn = {
  message: string;
};

export const updateTodo = async (token: string, prevState: UpdateTodoReturn, formData: FormData) => {
  const { client } = await getClient(token);
  const id = (formData.get('id') as string) ?? '';
  const task = (formData.get('task') as string) ?? '';
  const is_completed = (formData.get('is_completed') as string) ?? '';

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
