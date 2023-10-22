import ListHeader from "@/components/list-header";
import { getDate } from "@/services";
import { useEffect, useState } from "react";
import type { ITodo } from "@/services/interfaces/todo";
import ListItem from "@/components/list-item";

const USER_ID = "dcf267ef-0dbe-47c9-9a21-bbc9b13fea";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getDate(USER_ID);
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <ListHeader listName="🌴 Holiday tick list 🌴" />
      {todos.map((todo) => (
        <ListItem key={todo.id} task={todo} />
      ))}
    </div>
  );
};

export default App;
