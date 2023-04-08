import { Todo } from "./useTodo";

const handleCheckbox = (todo: Partial<Todo>) => {
  return { ...todo, isCompleted: !todo.isCompleted };
};
