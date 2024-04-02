import useTodos from "@/hooks/useTodos";
import { TodoPayload } from "@/services/todo.service";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  label: string;
  description: string;
  due_date: string;
};

interface TodoFormProps {
  addTodo: (todo: TodoPayload) => Promise<void>;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { label, description, due_date } = data;
      await addTodo({ label, description, due_date });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-3/6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 rounded-xl gap-4 bg-slate-50 border border-sky-500 text-black"
      >
        <div className="flex flex-col">
          <label htmlFor="description">Todo Label</label>
          <input
            {...register("label", { required: true })}
            className="p-2 rounded text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Todo Description</label>
          <input
            {...register("description", { required: true })}
            className="p-2 rounded text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Due Date</label>
          <input
            type="date"
            {...register("due_date")}
            className="p-2 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 p-4 rounded"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
