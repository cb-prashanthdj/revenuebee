// hooks/useAxiosFetch.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

// You can define a generic type for the data if you know the structure
// For a more dynamic approach, you can use any or define a generic type parameter for the hook
// type Data = any;

type UsePostDataResponse<T> = {
  postData: (data: T) => Promise<void>;
  loading: boolean;
  error: Error | null;
  response: any;
};

const useAxiosFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiLoading(true);
        const response = await axios.get<T>(url);

        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          setError(error);
        } else {
          const axiosError = new AxiosError("An unknown error occurred");
          setError(axiosError);
        }
      } finally {
        setApiLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, apiLoading };
};

export default useAxiosFetch;

export function usePostData<T, R>(url: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [response, setResponse] = useState<R | null>(null);

  const postData = async (data: T): Promise<R | null> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post<R>(url, data);
      setResponse(response.data);
      return response.data; // Return the response data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error);
      } else {
        const axiosError = new AxiosError("An unknown error occurred");
        setError(axiosError);
      }
      return null; // Return null in case of an error
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
}
