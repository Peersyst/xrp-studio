import { CollectionCreationNft } from "module/collection/types";
import Color from "color";
import { CreateCollectionNftRequest, MetadataAttributeDto } from "module/api/service";

export interface CollectionCreationDraftsProps {
    loading?: boolean;
    totalNfts: number;
    drafts: CollectionCreationNft[] | undefined;
    draftLink: (draft: CollectionCreationNft) => string;
    onDraftsAdded: (drafts: CreateCollectionNftRequest[]) => Promise<void> | void;
    onDraftRemoved: (id: number) => Promise<void> | void;
    name?: string | undefined;
    description?: string | undefined;
    transferFee?: string | undefined;
    externalUrl?: string | undefined;
    backgroundColor?: Color | undefined;
    burnable?: boolean | undefined;
    onlyXRP?: boolean | undefined;
    transferable?: boolean | undefined;
    attributes?: MetadataAttributeDto[] | undefined;
}
