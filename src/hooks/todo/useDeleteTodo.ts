import { AxiosError } from "axios";
import { useState } from "react";
import { deleteTodo } from "../../api/todo";

const useDeleteTodo = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDeleteTodo = async (id: number, todo: string) => {
    setIsDeleted(false);
    const cnofirm = window.confirm(`${todo}를 삭제하시겠습니까?`);
    try {
      if (cnofirm) {
        const response = await deleteTodo(id);
        if (response.status === 204) {
          alert("삭제되었습니다.");
          setIsDeleted(true);
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      } else {
        alert(e);
      }
    }
  };
  return { handleDeleteTodo, isDeleted };
};
export default useDeleteTodo;
