export const TodoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold text-blue-500">Todoアプリ</h1>
        {children}
      </div>
    </main>
  );
};

export default TodoLayout;
