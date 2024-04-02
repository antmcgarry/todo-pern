export type Todo = {
  id: string;
  user_id: string;
  label: string;
  description: string;
  completed: boolean;
  due_date: string;
  created_at: string;
  updated_at: string;
};

interface TodoFormProps {
  item: Todo;
}

const TodoItem = ({ item }: TodoFormProps) => {
  return (
    <div className="flex flex-col bg-slate-50 text-black p-4 w-full rounded">
      <h4>{item.label}</h4>
      <p>{item.description}</p>
      <p>{item.due_date}</p>
      <p>{item.created_at}</p>
      <p>{item.updated_at}</p>
      <div className="flex flex-row justify-end gap-4">
        <button className="text-white bg-blue-500 hover:bg-blue-700 p-4 rounded">
          Edit
        </button>
        <button className="text-white bg-red-500 hover:bg-red-700 p-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
