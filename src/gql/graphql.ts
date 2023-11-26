/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeleteTodoByIdInput = {
  id: Scalars['String']['input'];
};

export type DeleteTodoByIdResponse = {
  __typename?: 'DeleteTodoByIdResponse';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoItem;
  deleteTodoItem: DeleteTodoByIdResponse;
  updateTodoStatus: UpdateTodoStatusResponse;
};


export type MutationAddTodoArgs = {
  input: TodoItemInput;
};


export type MutationDeleteTodoItemArgs = {
  input?: InputMaybe<DeleteTodoByIdInput>;
};


export type MutationUpdateTodoStatusArgs = {
  input?: InputMaybe<UpdateTodoStatusInput>;
};

export type Query = {
  __typename?: 'Query';
  todoList: TodoList;
};

export type TodoItem = {
  __typename?: 'TodoItem';
  id: Scalars['ID']['output'];
  is_completed: Scalars['Boolean']['output'];
  task: Scalars['String']['output'];
};

export type TodoItemInput = {
  is_completed: Scalars['Boolean']['input'];
  task: Scalars['String']['input'];
};

export type TodoList = {
  __typename?: 'TodoList';
  items: Array<TodoItem>;
};

export type UpdateTodoStatusInput = {
  id: Scalars['String']['input'];
  is_completed: Scalars['Boolean']['input'];
};

export type UpdateTodoStatusResponse = {
  __typename?: 'UpdateTodoStatusResponse';
  success: Scalars['Boolean']['output'];
};
