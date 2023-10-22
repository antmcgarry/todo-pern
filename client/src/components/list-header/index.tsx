import { useState } from "react";
import { Modal } from "../modal";

interface ListHeaderProps {
  listName: string;
}

const onSignOut = () => {
  console.log("Sign out");
};

const ListHeader = ({ listName }: ListHeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-between items-center	p-4 border-b-4 border-slate-500">
      <h1 className="text-6xl">{listName}</h1>
      <div />
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <button
          className="flex sm:inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Add New
        </button>
        <button
          className="flex sm:inline-flex justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus-visible:ring ring-green-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New TODO"
      />
    </div>
  );
};

export default ListHeader;
