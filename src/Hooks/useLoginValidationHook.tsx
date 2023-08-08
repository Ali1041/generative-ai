import { inputState } from "@/interfaces/login";
import { useState } from "react";



const useLoginValidationHook = () => {
    const [email, setEmail] = useState<inputState>({
        value: "",
        error: false,
        helperText: ""
    })
    const [password, setPassword] = useState<inputState>({
        value: "",
        error: false,
        helperText: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, inputField: string) => {
        if (inputField === "email") {
        setEmail({
            value: e.target.value,
            error: false,
            helperText: ""
        })
        } else if (inputField === "password") {
        setPassword({
            value: e.target.value,
            error: false,
            helperText: ""
        })
        }
    }

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePassword = (password: string) => {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    return re.test(password);
    }
    

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!validateEmail(email.value)) {
        setEmail({
            value: email.value,
            error: true,
            helperText: "Please enter a valid email address."
        })
        }
        else if (!validatePassword(password.value)) {
        setPassword({
            value: password.value,
            error: true,
            helperText: "Please enter a valid password."
        })
        }
        else if (validateEmail(email.value) && validatePassword(password.value)) {
        setEmail({
            value: email.value,
            error: false,
            helperText: ""
        })
        setPassword({
            value: password.value,
            error: false,
            helperText: ""
        })
        }
    }

    return {email, password, onChange, onBlur}
}

export default useLoginValidationHook;