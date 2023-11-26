import { Query } from '@/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import { TodoDeleteForm } from './TodoDeleteForm';
import { TodoUpdateText } from './TodoUpdateText';

export const TodoList = async () => {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);

  const res = await client.request<Query>(gql`
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
  return (
    <div>
      {res &&
        res.todoList.items.map((todo) => {
          return (
            <div key={todo.id} className="mt-3 flex w-auto items-center gap-2 border-b">
              <p className="w-3">{todo.id}</p>
              <TodoUpdateText todo={todo} />
              <TodoDeleteForm id={todo.id} todo={todo.task} />
            </div>
          );
        })}
    </div>
  );
};
