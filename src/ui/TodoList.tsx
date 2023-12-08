import { Query } from '@/gql/graphql';
import { gql } from 'graphql-request';
import { TodoDeleteForm } from './TodoDeleteForm';
import { TodoUpdateText } from './TodoUpdateText';
import { getClient } from '@/actions/getClient';

export const TodoList = async () => {
  const { client } = await getClient('');

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
