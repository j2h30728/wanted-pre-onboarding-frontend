import axios, { AxiosError } from "axios";
import { useState } from "react";
import type { RawAxiosRequestHeaders } from "axios";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: unknown;
}
type UseMutationResult<T> = [
  (data: any, header: RawAxiosRequestHeaders) => void,
  UseMutationState<T>
];
export interface MutationResponseType {
  status: number;
  [key: string]: any;
}

export default function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const mutation = async (data: T, headers: RawAxiosRequestHeaders) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await axios.post(url, data, { headers });
      setState(prev => ({ ...prev, data: response.data, loading: false }));
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`[ERROR] ${error.response?.data.message}`);
      }
    }
  };
  return [mutation, { ...state }];
}
