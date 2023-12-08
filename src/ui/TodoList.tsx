import { TodoDeleteForm } from './TodoDeleteForm';
import { TodoUpdateText } from './TodoUpdateText';
import { getTodoList } from '@/actions/getTodoList';

export const TodoList = async () => {
  const { res } = await getTodoList('');

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
