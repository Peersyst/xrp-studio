import { BaseNftPageProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import { CollectionCreationNft } from "module/collection/types";
import { CreateCollectionNftRequest } from "module/api/service";

export interface CollectionCreationNftDraftPageScaffoldProps {
    backPath: string;
    draft: CollectionCreationNft | undefined;
    onSave: (draft: CreateCollectionNftRequest) => Promise<void> | void;
    collectionDrafts: BaseNftPageProps["collectionNfts"];
    loadingCollectionNfts?: BaseNftPageProps["loadingCollectionNfts"];
    draftLink: BaseNftPageProps["collectionNftLink"];
    collectionName: string | undefined;
    loading?: boolean;
}
