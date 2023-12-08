'use client';
import { useAuth } from '@/hooks/useAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const { auth } = useAuth();
  const router = useRouter();
  return (
    <main>
      <div className="my-4 flex">
        <h1 className="text-2xl font-bold text-blue-500">Todoアプリ</h1>
        <button
          className="ml-10 rounded-lg border bg-blue-400 p-2"
          onClick={async () => {
            await signInWithEmailAndPassword(auth, 'test@test.com', 'password');
            router.push('/todo');
          }}
        >
          ログイン
        </button>
      </div>
    </main>
  );
};
