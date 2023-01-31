import { useMutation } from "react-query";
import { CreateCollectionNftRequest } from "module/api/service";

export interface UseSaveCollectionDraftReturn {
    handleSave: (draft: CreateCollectionNftRequest) => void;
    saving: boolean;
}

export default function (onSave: (draft: CreateCollectionNftRequest) => Promise<void> | void): UseSaveCollectionDraftReturn {
    const save = async (draft: CreateCollectionNftRequest): Promise<void> => {
        await Promise.resolve(onSave(draft));
    };

    const { mutate: handleSave, isLoading: saving } = useMutation(save);

    return {
        handleSave,
        saving,
    };
}
