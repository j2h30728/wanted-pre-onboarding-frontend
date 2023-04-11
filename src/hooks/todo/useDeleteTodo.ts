import { getToken } from "../auth/useToken";
import useAxios from "../useAxios";
import { AxiosResponseType } from "../../types/api";

const useDeleteTodo = () => {
  const [request, { loading, error }] = useAxios<AxiosResponseType>();

  const token = getToken();
  const handleDeleteTodo = (id: number, todo: string) => {
    const cnofirm = window.confirm(`${todo}를 삭제하시겠습니까?`);
    try {
      if (cnofirm) {
        request("delete", `todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("삭제되었습니다.");
      }
    } catch (error) {
      alert(error);
    }
  };

  return { handleDeleteTodo, isDeleted: !error && loading };
};
export default useDeleteTodo;
