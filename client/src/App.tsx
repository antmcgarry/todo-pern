import ListHeader from "@/components/list-header";
import { getTodos } from "@/services";
import { useEffect, useState } from "react";
import type { ITodo } from "@/services/interfaces/todo";
import ListItem from "@/components/list-item";

const USER_ID = "dcf267ef-0dbe-47c9-9a21-bbc9b13fea0a";

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
    <div className="bg-purple-200 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-slate-200 rounded-xl lg:w-6/12 md:7/12 w-8/12 shadow-3xl">
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
