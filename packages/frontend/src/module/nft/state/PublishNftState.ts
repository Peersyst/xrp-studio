import { CollectionDto, CreateNftDraftRequest, NftDraftDto } from "module/api/service";
import { atom } from "recoil";

export interface PublishNftState {
    data?: CreateNftDraftRequest;
    nftDraft?: NftDraftDto;
    collection?: CollectionDto;
}

const publishNftState = atom<PublishNftState>({
    key: "publish-nft",
    default: {},
});

export default publishNftState;
