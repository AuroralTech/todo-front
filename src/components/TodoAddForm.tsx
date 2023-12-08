'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addTodo } from '@/app/actions/addTodo';
import useAuth from '@/app/actions/useAuth';
import { useEffect } from 'react';

const initialState = {
  message: '',
};
export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="ml-2 rounded-lg border bg-green-400 p-2 text-white disabled:bg-green-950"
      disabled={pending}
    >
      追加
    </button>
  );
};
export const TodoAddForm = () => {
  const [state, formAction] = useFormState(addTodo, initialState);
  const { token } = useAuth();
  useEffect(() => {
    console.log('token:', token);
  }, [token]);

  return (
    <form className="flex" action={formAction}>
      <input className="rounded-lg border p-2" type="text" id="token" name="token" defaultValue={token ?? ''} />
      <input className="rounded-lg border p-2" type="textarea" id="task" name="task" />
      <SubmitButton />
      <p className="sr-only" role="status" aria-live="polite">
        {state?.message}
      </p>
    </form>
  );
};
