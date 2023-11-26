'use client';
import { deleteTodo } from '@/app/actions/deleteTodo';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="ml-2 rounded-lg border bg-red-400 p-1 text-white disabled:bg-red-950"
      disabled={pending}
    >
      削除
    </button>
  );
};

export const TodoDeleteForm = ({ id, todo }: { id: string; todo: string }) => {
  const [state, formAction] = useFormState(deleteTodo, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <DeleteButton />
      <p className="sr-only" role="status" aria-live="polite">
        {state?.message}
      </p>
    </form>
  );
};
