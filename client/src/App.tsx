import ListHeader from "@/components/list-header";
import { getTodos } from "@/services";
import { useEffect, useState } from "react";
import type { ITodo } from "@/services/interfaces/todo";
import ListItem from "@/components/list-item";

const USER_ID = "fa730cbc-2239-4e0b-8b63-a4d6263a1ff2";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos(USER_ID);
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div className="bg-purple-200 pt-8">
      <div className="container mx-auto bg-slate-200 rounded-xl lg:w-6/12 md:7/12 w-8/12 shadow-3xl">
        <ListHeader listName="Todo App" />
        <div className="divide-y divide-slate-700">
          {todos.map((todo) => (
            <ListItem key={todo.id} task={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
