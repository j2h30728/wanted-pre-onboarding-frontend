import axios, { AxiosError } from "axios";
import { useState } from "react";
import type { RawAxiosRequestHeaders } from "axios";

type MethodType = "get" | "post" | "put" | "delete";

interface ConfigType {
  headers?: RawAxiosRequestHeaders;
}
interface UseAxiosState<T> {
  loading: boolean;
  data?: any;
  error?: unknown;
}

type UseAxiosResult<T> = [
  (method: MethodType, url: string, data?: any, config?: ConfigType) => void,
  UseAxiosState<T>
];
axios.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop/";
export default function useAxios<T>(): UseAxiosResult<T> {
  const [state, setState] = useState<UseAxiosState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const request = async (
    method: MethodType,
    url: string,
    data: any = null,
    config: ConfigType = {}
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await axios[method](url, data, config);
      console.log(response);
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
