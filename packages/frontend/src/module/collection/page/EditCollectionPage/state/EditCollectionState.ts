import { atom } from "recoil";

export interface EditCollectionState {
    header: string | undefined;
    image: string | undefined;
    name: string;
    description: string;
}

const editCollectionState = atom<EditCollectionState>({
    key: "edit-collection",
    default: { header: undefined, image: undefined, name: "", description: "" },
});

export default editCollectionState;
