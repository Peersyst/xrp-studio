import { useFormNotification } from "@peersyst/react-components";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";
import { useState } from "react";

export const useNotifyFileEditProfileForm = (type: "image" | "header"): EditableImageProps["onChange"] => {
    const [url, setUrl] = useState<string>("");
    useFormNotification(type, url);
    const handleOnChange = (url: string) => {
        setUrl(url);
    };
    return handleOnChange;
};
