import { Todo } from "../../types/todo";
import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useCheckbox = () => {
  const [request, { data }] = useApi<AxiosResponseType>();
  const handleCheckbox = async (todo: Partial<Todo>) => {
    try {
      request("put", `todos/${todo.id}`, {
        ...todo,
        isCompleted: !todo.isCompleted,
      });
    } catch (error) {
      alert(error);
    }
  };
  return { handleCheckbox, isChecked: data };
};
export default useCheckbox;
