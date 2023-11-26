import { TodoAddForm } from '@/components/TodoAddForm';
import { TodoList } from '@/components/TodoList';
import { Suspense } from 'react';

const Todo = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoAddForm />
        <TodoList />
      </Suspense>
    </div>
  );
};

export default Todo;
