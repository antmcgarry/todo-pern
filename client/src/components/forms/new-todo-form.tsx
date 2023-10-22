import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "../modal";
import { createTodo } from "@/services";

type Inputs = {
  title: string;
  description: string;
  progress: string;
};

interface NewTodoFormProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const NewTodoForm = ({ showModal, setShowModal }: NewTodoFormProps) => {
  const { register, handleSubmit, formState } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await createTodo({
        ...data,
        progress: parseInt(data.progress, 10),
        user_id: "dcf267ef-0dbe-47c9-9a21-bbc9b13fea0a",
      });
      console.log(response);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="Add New TODO"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full gap-4">
          <input
            {...register("title")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
          />
          <input
            {...register("description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
          />
          <input
            {...register("progress")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Progress"
            max={100}
          />
        </div>
        <div className="flex justify-end items-center w-full gap-4 mt-4 ">
          <button type="button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodoForm;
