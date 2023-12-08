'use server';
import { MutationAddTodoArgs, Mutation } from '@/gql/graphql';
import { gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';
import { getClient } from './getClient';

type AddTodoReturn = {
  message: string;
};

export const addTodo = async (token: string, prevState: AddTodoReturn, formData: FormData) => {
  const { client } = await getClient(token);
  formData.append('is_completed', 'false');
  const task = (formData.get('task') as string) ?? '';
  const is_completed = false;
  const variables: MutationAddTodoArgs = {
    input: {
      task,
      is_completed,
    },
  };

  const res = await client.request<Mutation, MutationAddTodoArgs>(
    gql`
      mutation addTodo($input: TodoItemInput!) {
        addTodo(input: $input) {
          id
          task
          is_completed
        }
      }
    `,
    variables
  );

  revalidatePath('/todo');
  if (res) {
    return { message: `Added to ${res.addTodo.task}` };
  }
  return { message: `Failed to add` };
};
