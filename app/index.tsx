import "../global.css";
import React, { useReducer, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const App = () => {
  const initialTodos: Todo[] = []; // Start with an empty array

  const reducer = (state: Todo[], action: any) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "toggle":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      case "delete":
        return state.filter((todo) => todo.id !== action.id);
      case "load":
        return action.payload; // Load todos from storage
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [inputText, setInputText] = useState("");

  // Load todos from AsyncStorage when the app starts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          dispatch({ type: "load", payload: JSON.parse(storedTodos) });
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    };
    loadTodos();
  }, []);

  // Save todos to AsyncStorage
  const saveTodos = async (todos: Todo[]) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  };

  const handleAdd = () => {
    if (inputText.trim()) {
      const newTodo = {
        id: uuid.v4(),
        text: inputText,
        completed: false,
      };
      dispatch({ type: "add", payload: newTodo });
      saveTodos([...todos, newTodo]); // Save the new todo
      setInputText(""); // Clear the input after adding
    }
  };

  const handleComplete = (todo: Todo) => {
    dispatch({ type: "toggle", id: todo.id });
    saveTodos(
      todos.map((t: Todo) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    ); // Save updated todos
  };

  const handleDelete = (todo: Todo) => {
    dispatch({ type: "delete", id: todo.id });
    saveTodos(todos.filter((t: Todo) => t.id !== todo.id)); // Save updated todos
  };

  return (
    <View className="flex-1 p-5 bg-slate-100">
      <Text className="p-3 text-2xl font-extrabold color-blue-700">
        My TO-DO List
      </Text>
      <ScrollView className="flex-1 bg-slate-200 p-3 rounded-lg">
        {todos.length === 0 ? (
          <Text className="pt-5 font-bold text-2xl text-center">
            Add some to-dos
          </Text>
        ) : null}
        {todos.map((todo: Todo) => (
          <View
            key={todo.id}
            className="flex-row items-center my-2 p-2 bg-white rounded-lg shadow"
          >
            <TouchableOpacity onPress={() => handleDelete(todo)}>
              <Text className="pr-3 text-red-500">🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleComplete(todo)}>
              <Text>{todo.completed ? "🔲" : "⬛"}</Text>
            </TouchableOpacity>
            <Text
              className={`ml-2 text-lg ${
                todo.completed ? "line-through text-gray-400" : "text-black"
              }`}
            >
              {todo.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 p-2 pl-5 bg-white rounded-full border border-gray-300"
          placeholder="Add to-do"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAdd}
        />
        <TouchableOpacity
          className="ml-2 bg-blue-500 p-2 rounded-full"
          onPress={handleAdd}
        >
          <Text className="text-white font-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
