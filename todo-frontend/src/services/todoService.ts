import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';
const EXTERNAL_API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Similarly, update other CRUD operations to use this URL
export const addTodo = async (todo: { title: string; description: string; status: string }) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, updatedTodo: Partial<{ title: string; description: string; status: string }>) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Function to import todos from external API and save them to your DB
export const importTodos = async () => {
  try {
    const response = await axios.post(`${API_URL}/import_todos`);
    console.log('Import response:', response.data);
  } catch (error) {
    console.error('Error importing todos:', error);
  }
};
