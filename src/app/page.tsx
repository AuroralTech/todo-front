'use client';
import { useEffect, useRef, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { Mutation, MutationAddTodoArgs, Query, TodoItem } from '@/gql/graphql';

export default function Page() {
  const BASE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:4000/graphql';
  const client = new GraphQLClient(BASE_GRAPHQL_ENDPOINT);

  const [todos, setTodos] = useState<TodoItem[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    client
      .request<Query>(gql`
        {
          todoList {
            items {
              id
              task
              is_completed
            }
          }
        }
      `)
      .then((data) => {
        setTodos(data.todoList.items);
      });
  }, []);

  const addTodo = (task: string, is_completed: boolean) => {
    const variables: MutationAddTodoArgs = {
      input: {
        task,
        is_completed,
      },
    };

    client.request<Mutation, MutationAddTodoArgs>(
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
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold text-blue-500">Todoアプリ</h1>
        <div className="flex">
          <input className="rounded-lg border p-2" type="textarea" ref={inputRef} />
          <button
            className="ml-2 rounded-lg border bg-green-400 p-2"
            onClick={() => {
              addTodo(inputRef.current?.value || '', false);
            }}
          >
            追加
          </button>
        </div>

        <ul>
          {todos &&
            todos.map((todo) => {
              return (
                <tr key={todo.id} className="flex w-auto gap-2">
                  <td className="w-3">{todo.id}</td>
                  <td className={todo.is_completed ? 'line-through' : ''}>{todo.task}</td>
                </tr>
              );
            })}
        </ul>
      </div>
    </main>
  );
}
