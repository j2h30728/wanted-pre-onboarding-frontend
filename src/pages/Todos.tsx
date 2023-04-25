import { useEffect, useState } from "react";
import EditTodo from "../components/EditTodo";
import { getToken } from "../util/useToken";
import useCheckbox from "../hooks/todo/useCheckbox";
import useCreateTodo from "../hooks/todo/useCrateTodo";
import useDeleteTodo from "../hooks/todo/useDeleteTodo";
import { Todo } from "../types/todo";
import useGetTodos from "../hooks/todo/useGetTodos";
import { withAuth } from "../hooks/auth/withAuth";

const Todos = withAuth(() => {
  const token = getToken();
  const [edit, setEdit] = useState<number | null>(null);
  const { handleCheckbox, isChecked } = useCheckbox();
  const { handleGetTodos, todos } = useGetTodos();
  const { handlecreateTodo, handleInput, input, isCreated } = useCreateTodo();
  const { handleDeleteTodo, isDeleted } = useDeleteTodo();

  useEffect(() => {
    if (token) {
      handleGetTodos();
    }
  }, [token, edit, isChecked, isDeleted, isCreated]);
  const handleChangeUpdateMode = (todo: Todo) => {
    setEdit(todo.id);
  };
  return (
    <div className="w-full h-[500px]">
      <h1 className="my-4 font-pacifico text-center text-3xl">Todo List</h1>
      <form
        className="w-full my-3 flex justify-between"
        onSubmit={handlecreateTodo}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          data-testid="new-todo-input"
          placeholder="create to do"
          className="w-5/6 p-2 rounded"
        />
        <button
          data-testid="new-todo-add-button"
          className="w-12 text-xl cursor-pointer bg-zinc-700 text-zinc-50 p-1 rounded-md hover:bg-zinc-600 active:bg-red-900">
          +
        </button>
      </form>
      <ul className="flex flex-col my-4 space-y-2 h-[75%] overflow-auto">
        {todos
          ?.map(todo => (
            <li key={todo.id} className="bg-zinc-100 p-1 px-3 rounded">
              {todo.id === edit ? (
                <EditTodo todo={todo} setEdit={setEdit} />
              ) : (
                <div className="flex justify-between items-center">
                  <label className="w-4/6 flex">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleCheckbox(todo)}
                    />
                    <span
                      className={`w-5/6 ml-2 font-semibold break-words ${
                        todo.isCompleted ? " line-through" : ""
                      }`}>
                      {todo.todo}
                    </span>
                  </label>
                  <div>
                    <button
                      data-testid="modify-button"
                      onClick={() => handleChangeUpdateMode(todo)}
                      className="mr-2 cursor-pointer bg-zinc-500 text-zinc-50 p-1 text-sm rounded-lg">
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      onClick={() => handleDeleteTodo(todo.id, todo.todo)}
                      className="bg-red-700 cursor-pointer text-zinc-50 p-1 text-sm rounded-lg">
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  );
});

export default Todos;
