import { useState } from "react";

const useCreateContent = () => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>('');

    const createContent = () => {
        // request service
        setContent("Content generated here")
    }

    return {title, setTitle, content, createContent}
}

export default useCreateContent