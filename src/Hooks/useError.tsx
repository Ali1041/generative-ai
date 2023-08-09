import { useState } from "react";
import { errorState } from "@/interfaces/login";

const useErrorHook = () => {
  const [isError, setIsError] = useState<errorState>({
    error: false,
    helperText: "",
  });

  const setError = (error: boolean, helperText: string) => {
    setIsError({
      error,
      helperText,
    });
  };

  return { isError, setError };
};
export default useErrorHook;