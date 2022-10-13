import { uploadFile } from "module/api/service/helper/uploadFile";
import { useMutation, UseMutationResult } from "react-query";

const useUploadFile = (): UseMutationResult<string, unknown, File, unknown> => {
    return useMutation(uploadFile);
};

export default useUploadFile;
