import React, { useEffect, useState } from "react";
import "./App.css";

type Status = "pending" | "completed" | "closed";

type Todo = {
  id: number;
  text: string;
  status: Status;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      status: "pending", // default
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const updateStatus = (id: number, status: Status) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>📝 Todo Status App</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          placeholder="Enter task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={todo.status}>
              {todo.text} ({todo.status})
            </span>

            <div className="buttons">
              <button onClick={() => updateStatus(todo.id, "pending")}>
                🔄
              </button>
              <button onClick={() => updateStatus(todo.id, "completed")}>
                ✅
              </button>
              <button onClick={() => updateStatus(todo.id, "closed")}>
                ❌
              </button>
              <button onClick={() => deleteTodo(todo.id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;