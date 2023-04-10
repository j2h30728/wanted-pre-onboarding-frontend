import useUpdateTodo from "../hooks/todo/ueeUpdateTodo";
import { Todo } from "../types/todo";
import { useEffect } from "react";

interface EditTodoProps {
  todo: Todo;
  setEdit: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditTodo = ({ todo, setEdit }: EditTodoProps) => {
  const {
    handleUpdateTodo,
    isUpdated,
    setCheckboxStatus,
    updateInput,
    setUpdateInput,
  } = useUpdateTodo(todo);

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(event.target.value);
  };
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStatus(event.currentTarget.checked);
  };
  useEffect(() => {
    if (isUpdated) {
      setEdit(null);
    }
  }, [isUpdated]);

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
        value={updateInput}
        className="w-3/5 bg-transparent border-b-2 border-blue-500"
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
