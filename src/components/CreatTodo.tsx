import useInput from "../hooks/useInput";
import useTodo from "../hooks/useTodo";

const CreateTodo = () => {
  const { handleInput, input, setInput } = useInput();
  const { createTodo } = useTodo();
  const handlecreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo({ todo: input }).catch(error => alert(`잘못된 입력입니다.}`));
    setInput("");
  };

  return (
    <form onSubmit={handlecreateTodo}>
      <input
        type="text"
        onChange={handleInput}
        value={input}
        data-testid="new-todo-input"
        placeholder="create to do"
      />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
};
export default CreateTodo;
