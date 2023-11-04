import type { ITodo } from "@/services/interfaces/todo";
import ProgressBar from "../progressbar";
import { deleteTodo } from "@/services";

interface ListItemProps {
  task: ITodo;
}

const ListItem = ({ task }: ListItemProps) => {
  const onDelete = async () => {
    try {
      await deleteTodo(task.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li className="flex md:flex-row flex-col w-full justify-between bg-gray-50">
      <div className="w-full p-4">
        <p className="text-3xl underline">{task.title}</p>
        <div className="bg-white p-2 rounded-xl my-4">
          <p className="text-xl">{task.description}</p>
        </div>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="flex items-center justify-center p-4 gap-4">
        <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100">
          Edit
        </button>
        <button
          className="py-2 px-4 bg-red-500 hover:bg-red-600 active:bg-red-700 focus-visible:ring ring-red-300 text-white font-semibold text-center rounded-md outline-none transition duration-100"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListItem;
