import { inputState } from "@/interfaces/login";
import { authService } from "@/services";
import { useState } from "react";
import useErrorHook from "../useError";
import { useRouter } from "next/router";

const UseSignUpHook = (email: inputState, password: inputState) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isError, setError } = useErrorHook();
  const router = useRouter();

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
      const data = await authService.signup(email.value, password.value);
      if (data.status === 201) {
        router.push("/auth/login");
      } else {
        throw new Error(data.data.helperText);
      }
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

export default UseSignUpHook;
