import { AxiosError } from "axios";
import { useState } from "react";
import { deleteTodo } from "../../api/todo";

const useDeleteTodo = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDeleteTodo = (id: number, todo: string) => {
    window.confirm(`${todo}를 삭제하시겠습니까?`);
    deleteTodo(id)
      .then(response => {
        if (response.status === 204) {
          alert("삭제되었습니다.");
          setIsDeleted(true);
        }
      })
      .catch(e => {
        if (e instanceof AxiosError) {
          alert(`[ERROR] ${e.response?.data.message}`);
        }
      });
    setIsDeleted(false);
  };
  return { handleDeleteTodo, isDeleted };
};
export default useDeleteTodo;
