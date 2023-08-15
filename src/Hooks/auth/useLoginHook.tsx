import { errorState, inputState } from "@/interfaces/login";
import { authService } from "@/services";
import { useState } from "react";
import useErrorHook from "../useError";
import { Cookies } from "js-cookie";
import { useRouter } from "next/router";

const useLoginHook = (email: inputState, password: inputState) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, setError } = useErrorHook();

  const router = useRouter()

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
      await authService.login(email.value, password.value);
      setIsLoading(false)
      router.push("/")
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.helperText ||
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
