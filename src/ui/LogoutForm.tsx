'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const LogoutForm = () => {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <main>
      <div className="my-4 flex">
        <button
          className="ml-10 rounded-lg border bg-red-400 p-2"
          onClick={() => {
            logout();
          }}
        >
          ログアウト
        </button>
      </div>
    </main>
  );
};
