import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useTodo from "../hooks/useTodo";

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function Todo() {
  const { handleInput, input, setInput } = useInput();
  const { createTodo, getTodo, updateTodo } = useTodo();
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    getTodo()
      .then(response => setTodos(response.data))
      .catch(error => alert("Todo불러오는데 문제가 발생했습니다."));
  }, [getTodo]);

  const handlecreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    // input
    event.preventDefault();
    createTodo({ todo: input }).catch(error => alert(`잘못된 입력입니다.}`));
  };

  const handleUpdateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handlecreateTodo}>
        <input
          type="text"
          onChange={handleInput}
          data-testid="new-todo-input"
          placeholder="create to do"
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" defaultChecked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button">삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
