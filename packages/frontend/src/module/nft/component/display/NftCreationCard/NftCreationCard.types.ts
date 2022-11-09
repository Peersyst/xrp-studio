import { CreateCollectionNftRequest, CreateNftDraftRequest } from "module/api/service";
import { Common } from "@peersyst/react-types";

export interface NftCreationCardProps {
    nft: Common<CreateNftDraftRequest, CreateCollectionNftRequest>;
    to?: string;
}
