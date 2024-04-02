"use client";
import LoginForm from "@/components/login-form";
import Modal from "@/components/modal";
import TodoForm from "@/components/todo-form";
import TodoItem from "@/components/todo-item";
import useTodos from "@/hooks/useTodos";
import { useState } from "react";

export default function Home() {
  const { todos, addTodo } = useTodos();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <header className="flex w-full h-16 bg-gray-800">
        <div className="flex items-center justify-between mx-auto min-w-80 max-w-7xl w-full px-4">
          <h1 className="text-white font-bold">Todo</h1>
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 p-4 rounded "
            onClick={() => setOpen(true)}
          >
            Sign in
          </button>
        </div>
      </header>
      <main className="flex h-screen w-full">
        <div className="flex flex-col flex-[1_0_auto]">
          <div className="flex mx-auto min-w-80 max-w-7xl w-full px-4 mt-2">
            <section className="flex flex-col w-3/4 gap-4">
              {todos.map((item) => (
                <TodoItem key={item.id} item={item} />
              ))}
            </section>
            <section className="w-3/12 pl-2">
              <TodoForm addTodo={addTodo} />
            </section>
          </div>
        </div>
      </main>
      <Modal open={open} onClose={() => setOpen(false)}>
        <LoginForm onNext={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
