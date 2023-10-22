import type { ITodo } from "@/services/interfaces/todo";
import ProgressBar from "../progressbar";
import TickIcon from "../tick-icon";
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
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-secondary" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListItem;
