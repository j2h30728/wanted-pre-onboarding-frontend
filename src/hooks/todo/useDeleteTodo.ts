import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useDeleteTodo = () => {
  const [request, { loading, error }] = useApi<AxiosResponseType>();

  const handleDeleteTodo = (id: number, todo: string) => {
    const cnofirm = window.confirm(`${todo}를 삭제하시겠습니까?`);
    try {
      if (cnofirm) {
        request("delete", `todos/${id}`);
        alert("삭제되었습니다.");
      }
    } catch (error) {
      alert(error);
    }
  };

  return { handleDeleteTodo, isDeleted: !error && !loading };
};
export default useDeleteTodo;
