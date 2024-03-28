const createTodo = async (todo: Todo): Promise<Todo> => {
  const todoModel = new TodoModel(todo);
  const savedTodo = await todoModel.save();
  return savedTodo;
};

const getTodos = async (): Promise<Todo[]> => {
  const todos = await TodoModel.find();
  return todos;
};

const getTodoById = async (id: string): Promise<Todo | null> => {
  const todo = await TodoModel.findById(id);
  return todo;
};

const updateTodo = async (id: string, todo: Todo): Promise<Todo | null> => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, {
    new: true,
  });
  return updatedTodo;
};

const deleteTodo = async (id: string): Promise<Todo | null> => {
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  return deletedTodo;
};
