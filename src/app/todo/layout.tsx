import Image from 'next/image';
export const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50">
      <div className="w-1/3 rounded-xl bg-yellow-100 p-10">
        <div className="flex items-center gap-2">
          <Image src="/images/auroral_tech.png" width={1024} height={1024} alt="auroral_tech" className="w-10" />
          <h1 className="text-2xl font-bold text-blue-500">Todoアプリ</h1>
        </div>
        {children}
      </div>
    </main>
  );
};

export default TodoLayout;
