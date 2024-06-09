import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    fetchTodos();
  }, [filterText, sortOrder]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    let filteredTodos = response.data;

    // Filtering
    if (filterText) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sorting
    filteredTodos.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setTodos(filteredTodos);
  };

  const addTodo = async () => {
    const response = await axios.post('http://localhost:5000/todos', { title: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const updateTodo = async (id, completed) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <div>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter todos"
        />
        <button onClick={() => setSortOrder('asc')}>Sort Ascending</button>
        <button onClick={() => setSortOrder('desc')}>Sort Descending</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, !todo.completed)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
