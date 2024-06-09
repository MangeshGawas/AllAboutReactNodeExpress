import React , { useState, useEffect } from 'react'
import axios from 'axios'

const TodoList = () => {
    const [todos,setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    useEffect(()=>{
        fetchTodos()
    },[])

    const fetchTodos = async()=>{
        const response = await axios.get('http://localhost:5000/todos')
        setTodos(response.data)
    }

    const addTodo = async()=>{
        const response = await axios.post('http://localhost:5000/todos', { title: newTodo })
        setTodos([...todos,response.data])
        setNewTodo('')

    }

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
        <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
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
    </div>
  )
}


export default TodoList