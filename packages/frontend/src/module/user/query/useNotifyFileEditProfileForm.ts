import { useFormNotification } from "@peersyst/react-components";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";
import { useState } from "react";
import { UpdateUserFields } from "../component/feedback/EditProfileDrawer/EditProfileDrawer.types";

export const useNotifyFileEditProfileForm = (type: UpdateUserFields, file: string): EditableImageProps["onChange"] => {
    const [url, setUrl] = useState<string>(file);
    useFormNotification(type, url);
    const handleOnChange = (url: string) => {
        setUrl(url);
    };
    return handleOnChange;
};
