import useUploadFile from "module/common/query/useUploadFile";
import { useState } from "react";
import { getUserRequestFromUserDTO } from "../util/getUserRequestFromUserDTO";
import useGetWalletUser from "./useGetWalletUser";
import { useUpdateUser } from "./useUpdateUser";

type UserRequestFile = "image" | "header";

export interface UseUpdateUserFileReturn {
    handleFileChange: (file: File, type: UserRequestFile) => Promise<void>;
    updating: boolean;
}

const useUpdateUserFile = (): UseUpdateUserFileReturn => {
    // State
    const [updating, setUpdating] = useState(false);
    //Hooks
    const { mutateAsync: uploadFile } = useUploadFile();
    const { mutateAsync: updateUser } = useUpdateUser();
    const { refetch, data: user = { address: "" } } = useGetWalletUser();

    const handleFileChange = async (file: File, type: UserRequestFile) => {
        setUpdating(true);
        const req = getUserRequestFromUserDTO(user);
        req[type] = await uploadFile(file);
        await updateUser(req);
        await refetch();
        setUpdating(false);
    };
    return { handleFileChange, updating };
};

export default useUpdateUserFile;
