"use client";

import { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo, importTodos } from '../src/services/todoService';
import './globals.css'


type Todo = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', status: 'pendente' });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    const addedTodo = await addTodo(newTodo);
    setTodos([...todos, addedTodo]);
    setNewTodo({ title: '', description: '', status: 'pendente' });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    const updated = await updateTodo(id, updatedTodo);
    setTodos(todos.map(todo => (todo.id === id ? updated : todo)));
  };

  const handleImportTodos = async () => {
    await importTodos();
    fetchTodos();
  };

  return (

    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Todo List</h1>
      <button
        onClick={handleImportTodos}
        className="bg-green-600 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors mb-6 mx-auto block"
      >
        Import Todos from API
      </button>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="Title"
          className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 mb-2 md:mb-0 md:mr-4"
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Description"
          className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 mb-2 md:mb-0 md:mr-4"
        />
        <select
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 mb-2 md:mb-0 md:mr-4"
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluída">Concluída</option>
        </select>
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Add Todo
        </button>
      </div>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600">{todo.description}</p>
            <p className="text-sm text-gray-500">Status: {todo.status}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleUpdateTodo(todo.id, { status: 'concluída' })}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
              >
                Complete
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
