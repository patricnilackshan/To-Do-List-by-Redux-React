import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : {todos:[]};
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};


export const todoSlice = createSlice({
    name: 'todo',
    initialState:loadTodosFromLocalStorage(),
    reducers: {
        addTodo:(state,action) => {
            const  todo ={
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
            saveTodosToLocalStorage(state);

        },
        removeTodo:(state,action) => {
            state.todos = state.todos.filter((todo)=>(todo.id !== action.payload))
            saveTodosToLocalStorage(state);

        }

    },
})

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer