import { CreateCollectionNftRequest, CreateNftDraftRequest } from "module/api/service";
import { Common } from "@peersyst/react-types";
import { BaseCardProps } from "../../surface/BaseCard/BaseCard.types";

export interface NftCreationCardProps extends Pick<BaseCardProps, "onDeleteClicked"> {
    nft: Common<CreateNftDraftRequest, CreateCollectionNftRequest>;
    to?: string;
}
