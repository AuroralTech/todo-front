import { LoginForm } from '@/ui/LoginForm';
import { LogoutForm } from '@/ui/LogoutForm';
import { Suspense } from 'react';

const Login = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
        <LogoutForm />
      </Suspense>
    </div>
  );
};

export default Login;
