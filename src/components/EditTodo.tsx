import { useState } from "react";
import { Todo, updateTodo } from "../api/todo";
import { handleCheckbox } from "../hooks/useInput";

interface EditTodoProps {
  todo: Todo;
  setEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditTodo = ({ todo, setEdit }: EditTodoProps) => {
  handleCheckbox({ ...todo, isCompleted: !todo.isCompleted });

  const [updateInput, setUpdateInput] = useState<string>();
  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(event.target.value);
  };

  const handleUpdateTodo = (todo: Partial<Todo>) => {
    updateTodo({ ...todo, todo: updateInput ? updateInput : todo.todo })
      .then(response => response.status === 200 && setEdit(null))
      .catch(error => alert(`[ERROR] Todo를 수정할 수 없습니다.`));
    setUpdateInput("");
  };

  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={() => handleCheckbox(todo)}
      />
      <input
        type="text"
        onChange={handleUpdateInput}
        data-testid="modify-input"
        value={updateInput ? updateInput : todo.todo}
      />
      <button
        data-testid="submit-button"
        onClick={() => handleUpdateTodo(todo)}>
        제출
      </button>
      <button data-testid="cancel-button" onClick={() => setEdit(null)}>
        취소
      </button>
    </div>
  );
};

export default EditTodo;
