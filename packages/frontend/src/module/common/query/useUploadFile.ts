import { uploadFile } from "module/api/service/helper/uploadFile";
import { useMutation, UseMutationResult } from "react-query";

const useUploadFile = (path: string): UseMutationResult<string, unknown, File, unknown> => {
    return useMutation((file) => uploadFile(file, path));
};

export default useUploadFile;
