import { CreateNftDraftRequest } from "module/api/service";
import { atom } from "recoil";

export interface PublishNftState {
    data: CreateNftDraftRequest;
    nftDraftId?: number;
    collection?: string;
}

const publishNftState = atom<PublishNftState>({
    key: "publish-nft",
    default: { data: {}, nftDraftId: 0, collection: "" },
});

export default publishNftState;
