import { AxiosError } from "axios";
import { useState } from "react";
import { Todo, updateTodo } from "../api/todo";

interface EditTodoProps {
  todo: Todo;
  setEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditTodo = ({ todo, setEdit }: EditTodoProps) => {
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(
    todo.isCompleted
  );

  const [updateInput, setUpdateInput] = useState<string>();
  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(event.target.value);
  };
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStatus(event.currentTarget.checked);
  };

  const handleUpdateTodo = (todo: Partial<Todo>) => {
    updateTodo({
      ...todo,
      todo: updateInput ? updateInput : todo.todo,
      isCompleted: checkboxStatus,
    })
      .then(response => response.status === 200 && setEdit(null))
      .catch(e => {
        if (e instanceof AxiosError) {
          alert(`[ERROR] ${e.response?.data.message}`);
        }
      });
    setUpdateInput("");
  };

  return (
    <div className="flex justify-between items-center">
      <input
        type="checkbox"
        defaultChecked={todo.isCompleted}
        onChange={handleCheckbox}
      />
      <input
        type="text"
        onChange={handleUpdateInput}
        data-testid="modify-input"
        value={updateInput ? updateInput : todo.todo}
        className="bg-transparent border-b-2 border-blue-500"
      />
      <div>
        <button
          data-testid="submit-button"
          onClick={() => handleUpdateTodo(todo)}
          className="mr-2 cursor-pointer bg-blue-500 text-zinc-50 p-1 text-sm rounded-lg">
          제출
        </button>
        <button
          data-testid="cancel-button"
          onClick={() => setEdit(null)}
          className="bg-zinc-700 cursor-pointer text-zinc-50 p-1 text-sm rounded-lg">
          취소
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
