import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../util/api";

type MethodType = "get" | "post" | "put" | "delete";
interface UseApiState {
  loading: boolean;
  data?: any;
  error?: unknown;
  response?: any;
}

type UseApiResult<T> = [
  (method: MethodType, url: string, data?: T) => void,
  UseApiState
];
export default function useApi<T>(): UseApiResult<T> {
  const [state, setState] = useState<UseApiState>({
    loading: false,
    data: undefined,
    error: null,
    response: undefined,
  });
  const request = async (
    method: MethodType,
    url: string,
    data: T | null = null
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await api[method](url, data || undefined);
      if (response)
        setState(prev => ({
          ...prev,
          data: response.data,
          loading: false,
          response,
          error: null,
        }));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("axioserror :", error);
        setState(prev => ({ ...prev, loading: false, error }));
      } else {
        console.error("error", error);
        setState(prev => ({ ...prev, loading: false, error: null }));
      }
    }
  };
  return [request, { ...state }];
}
