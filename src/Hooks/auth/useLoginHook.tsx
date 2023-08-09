import { errorState, inputState } from "@/interfaces/login";
import { authService } from "@/services";
import { useState } from "react";
import useErrorHook from "../useError";
import {Cookies} from 'js-cookie'

const useLoginHook = (email: inputState, password: inputState) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {isError, setError} = useErrorHook()

  const onSubmit = async (e: React.MouseEvent) => {
    if (email.error || password.error) {
      setError(true, "Please enter a valid email and password.");

      setTimeout(() => {
        setError(false, "");
      }, 3000);
      return;
    }
    setIsLoading(true);
    try {
      const result = await authService.login(email.value, password.value);
      if (result.status === 200) {
        Cookies.set('token', result.data.token)
        setIsLoading(false);
      } else {
        throw new Error(result.data.helperText);
      }
    } catch (err: any) {
      const errorMessage =
        err.response.data.helperText ||
        "Something went wrong. Please try again later.";
      setError(true, errorMessage);

      setTimeout(() => {
        setError(false, "");
        setIsLoading(false);
      }, 3000);
      return;
    }
  };

  return { isLoading, isError, onSubmit };
};

export default useLoginHook;