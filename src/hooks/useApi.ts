import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../util/api";

type MethodType = "get" | "post" | "put" | "delete";
interface UseApiState<T> {
  loading: boolean;
  data?: any;
  error?: unknown;
}

type UseApiResult<T> = [
  (method: MethodType, url: string, data?: any) => void,
  UseApiState<T>
];
export default function useApi<T>(): UseApiResult<T> {
  const [state, setState] = useState<UseApiState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const request = async (method: MethodType, url: string, data: any = null) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await api[method](url, data);
      console.log(response);
      if (response)
        setState(prev => ({ ...prev, data: response.data, loading: false }));
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        alert(`[ERROR] ${error.response?.data.message}`);
        setState(prev => ({ ...prev, error }));
      }
    }
  };

  return [request, { ...state }];
}
