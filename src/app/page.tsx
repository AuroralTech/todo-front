'use client';
import { useState } from 'react';

export default function Page() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <main className="min-h-screen w-1 p-2">
      <h1>Todoアプリ</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAddTodo}>追加</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </main>
  );
}
