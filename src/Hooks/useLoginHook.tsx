import { errorState, inputState } from "@/interfaces/login";
import axios from "axios";
import { useState } from "react";


const useLoginHook = (email: inputState, password: inputState) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<errorState>({
        error: false,
        helperText: ""
    });

    const onSubmit = async (e: React.MouseEvent) => {
        if (email.error || password.error) {
            setIsError({
                error: true,
                helperText: "Please enter a valid email and password."
            })

            setTimeout(() => {
                setIsError({
                    error: false,
                    helperText: ""
                })
            }, 3000)
            return
        }
        setIsLoading(true);
        try{
            const data = await axios.post("http://localhost:3000/api/login", {
            email: email.value,
            password: password.value
        })
        if (data.status === 200) {
            localStorage.setItem("authToken", data.data.token);
            setIsLoading(false);
        }
        else {
            throw new Error(data.data.helperText)
        }
    }
     catch (err: any){
        const errorMessage = err.response.data.helperText || 'Something went wrong. Please try again later.'
        setIsError({
            error: true,
            helperText: errorMessage
        })

        setTimeout(() => {
            setIsError({
                error: false,
                helperText: ""
            })
        }, 3000)
        return
     }
    }

    return {isLoading, isError, onSubmit}
}

export default useLoginHook;