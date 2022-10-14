import { useFormNotification } from "@peersyst/react-components";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";
import { useState } from "react";

export const useNotifyFileEditProfileForm = (type: "image" | "header", file: string): EditableImageProps["onChange"] => {
    const [url, setUrl] = useState<string>(file);
    useFormNotification(type, url);
    const handleOnChange = (url: string) => {
        setUrl(url);
    };
    return handleOnChange;
};
