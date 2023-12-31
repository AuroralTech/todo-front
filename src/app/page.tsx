import { LoginForm } from '@/ui/LoginForm';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Page;
