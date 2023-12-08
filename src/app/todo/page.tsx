import { TodoAddForm } from '@/ui/TodoAddForm';
import { TodoList } from '@/ui/TodoList';
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
