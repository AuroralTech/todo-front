'use client';
import { updateTodo } from '@/actions/updateTodo';
import { TodoItem } from '@/gql/graphql';
import { useAuth } from '@/hooks/useAuth';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};
type Props = {
  todo: TodoItem;
};
const UpdateText = (props: Props) => {
  const { task, is_completed } = props.todo;
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="ml-2 w-full border-none" disabled={pending} name={task}>
      <p className={`text-left ${is_completed ? 'line-through' : ''}`}>{task}</p>
    </button>
  );
};

export const TodoUpdateText = (props: Props) => {
  const { id, is_completed } = props.todo;
  const { token } = useAuth();
  const [state, formAction] = useFormState(updateTodo, initialState);
  return (
    <form action={formAction} className="flex-grow">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="is_completed" value={`${is_completed}`} />
      <UpdateText todo={props.todo} />
      <p className="sr-only" role="status" aria-live="polite">
        {state?.message}
      </p>
    </form>
  );
};
