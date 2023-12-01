'use server';
import { MutationAddTodoArgs, Mutation } from '@/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { revalidatePath } from 'next/cache';

type AddTodoReturn = {
  message: string;
};

export const addTodo = async (prevState: AddTodoReturn, formData: FormData) => {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);
  client.setHeader('Authorization', `Bearer MY_TOKEN`);
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
  console.log(client);

  revalidatePath('/todo');
  if (res) {
    return { message: `Added to ${res.addTodo.task}` };
  }
  return { message: `Failed to add` };
};
