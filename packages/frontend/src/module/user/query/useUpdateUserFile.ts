import { UpdateUserRequest } from "module/api/service";
import useUploadFile from "module/common/query/useUploadFile";
import { useState } from "react";
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
    const { refetch } = useGetWalletUser();

    const handleFileChange = async (file: File, type: UserRequestFile) => {
        const req: UpdateUserRequest = {};
        setUpdating(true);
        req[type] = await uploadFile(file);
        await updateUser(req);
        await refetch();
        setUpdating(false);
    };
    return { handleFileChange, updating };
};

export default useUpdateUserFile;
