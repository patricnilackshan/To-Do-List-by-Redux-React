import React from "react";
import Todos from "./components/Todo.jsx";
import AddTodo from "./components/AddTodo.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-4xl text-white mb-6">Todo List</h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
