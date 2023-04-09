import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { deleteTodo, getTodo, Todo } from "../api/todo";
import EditTodo from "../components/EditTodo";
import useCheckbox from "../hooks/useCheckbox";
import useCreateTodo from "../hooks/useCrateTodo";
import { getToken } from "../hooks/useToken";

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>();
  const [edit, setEdit] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const { handleCheckbox, isChecked } = useCheckbox();
  const { handlecreateTodo, isCreated, handleInput, input } = useCreateTodo();
  const token = getToken();

  if (!token) window.location.href = "/signin";
  useEffect(() => {
    if (token) {
      getTodo()
        .then(response => {
          setTodos(response.data);
        })
        .catch(e => {
          if (e instanceof AxiosError) {
            alert(`[ERROR] ${e.response?.data.message}`);
          }
        });
    }
  }, [token, edit, isChecked, isDeleted, isCreated]);

  const handleChangeUpdateMode = (todo: Todo) => {
    setEdit(todo.id);
  };

  const handleDelete = (id: number, todo: string) => {
    window.confirm(`${todo}를 삭제하시겠습니까?`);
    deleteTodo(id)
      .then(response => {
        if (response.status === 204) {
          alert("삭제되었습니다.");
          setIsDeleted(true);
        }
      })
      .catch(e => {
        if (e instanceof AxiosError) {
          alert(`[ERROR] ${e.response?.data.message}`);
        }
      });
    setIsDeleted(false);
  };
  return (
    <div className="w-full h-full">
      <h1 className={todoStyle.title}>Todo List</h1>
      <div className="w-full my-3 flex justify-between">
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
          className="w-12 text-xl cursor-pointer bg-zinc-700 text-zinc-50 p-1 rounded-md"
          onClick={handlecreateTodo}>
          +
        </button>
      </div>
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
                    <span className="w-5/6 ml-2 font-semibold break-words">
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
                      onClick={() => handleDelete(todo.id, todo.todo)}
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
}
const todoStyle = {
  title: "my-4 font-pacifico text-center text-3xl",
  form: "flex flex-col mt-3",
  inputContainer: "flex flex-col my-3 space-y-2",
  input: "p-2 rounded",
  button: "w-full my-3 bg-zinc-500 rounded h-9 text-stone-50",
  otherLink:
    "ml-4 cursor-pointer border-b-2 border-solid text-zinc-500 hover:text-zinc-400 active:text-red-800",
};
