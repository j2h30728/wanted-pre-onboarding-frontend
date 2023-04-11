import { Todo } from "../../types/todo";
import useAxios from "../useAxios";
import { getToken } from "../auth/useToken";
import { AxiosResponseType } from "../../types/api";

const useCheckbox = () => {
  const [request, { data }] = useAxios<AxiosResponseType>();
  const token = getToken();

  const handleCheckbox = async (todo: Partial<Todo>) => {
    try {
      request(
        "put",
        `todos/${todo.id}`,
        {
          ...todo,
          isCompleted: !todo.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert(error);
    }
  };
  return { handleCheckbox, isChecked: data };
};
export default useCheckbox;
