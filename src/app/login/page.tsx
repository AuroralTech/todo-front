import { LoginForm } from '@/ui/LoginForm';
import { Suspense } from 'react';

const Login = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
