import { useEffect, useState } from "react";
import CreateTodo from "../components/CreatTodo";
import EditTodo from "../components/EditTodo";
import { handleCheckbox } from "../hooks/useInput";
import useTodo, { Todo } from "../hooks/useTodo";
import { getToken } from "../hooks/useToken";

export default function Todos() {
  const { getTodo, deleteTodo } = useTodo();
  const [todos, setTodos] = useState<Todo[]>();
  const [edit, setEdit] = useState<number | null>(null);

  const token = getToken();
  if (!token) window.location.href = "/signin";

  useEffect(() => {
    getTodo()
      .then(response => setTodos(response.data))
      .catch(error => alert("Todo불러오는데 문제가 발생했습니다."));
  }, [getTodo]);

  const handleChangeUpdateMode = (todo: Todo) => {
    setEdit(todo.id);
  };

  const handleDelete = (id: number, todo: string) => {
    window.confirm(`${todo}를 삭제하시겠습니까?`);
    deleteTodo(id)
      .then(response => response.status === 204 && alert("삭제되었습니다."))
      .catch(error => `[ERROR] ${todo}를 삭제할 수 없습니다.`);
  };
  return (
    <div>
      <h1>Todo</h1>
      <CreateTodo />
      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            {todo.id === edit ? (
              <EditTodo todo={todo} setEdit={setEdit} />
            ) : (
              <div>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={todo.isCompleted}
                    onChange={() => handleCheckbox(todo)}
                  />
                  <span>{todo.todo}</span>
                </label>
                <button
                  data-testid="modify-button"
                  onClick={() => handleChangeUpdateMode(todo)}>
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => handleDelete(todo.id, todo.todo)}>
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
