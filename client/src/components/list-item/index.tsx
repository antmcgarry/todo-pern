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
    <li className="flex w-full justify-between bg-gray-50">
      <div className="w-full p-4">
        <p className="text-3xl underline">{task.title}</p>
        <div className="bg-white p-2 rounded-xl my-4">
          <p className="text-xl">{task.description}</p>
        </div>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="flex justify-center gap-4 p-4">
        <button className="flex sm:inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2">
          Edit
        </button>
        <button
          className="flex sm:inline-flex justify-center items-center bg-red-500 hover:bg-red-600 active:bg-red-700 focus-visible:ring ring-red-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListItem;
