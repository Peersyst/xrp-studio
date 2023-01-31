import { CreateCollectionNftRequest, MetadataAttributeDto, NftDraftDto } from "module/api/service";
import { ReactNode } from "react";
import Color from "color";
import { CollectionCreationNft } from "module/collection/types";

export type CollectionCreationContentProps<D extends boolean = false> = {
    loading?: boolean;
    totalNfts: number;
    drafts: NftDraftDto[] | undefined;
    draftLink: (draft: CollectionCreationNft) => string;
    onDraftsAdded: (drafts: CreateCollectionNftRequest[]) => Promise<void> | void;
    onDraftRemoved: (id: number) => Promise<void> | void;
    header: string | undefined;
    setHeader: (header: string | undefined) => void;
    image: string | undefined;
    setImage: (image: string | undefined) => void;
    name: string | undefined;
    setName: (name: string) => void;
    description: string | undefined;
    setDescription: (description: string) => void;
    showDefaults: D;
    children: ReactNode;
} & (D extends true
    ? {
          transferFee: string | undefined;
          setTransferFee: (transferFee: string) => void;
          externalUrl: string | undefined;
          setExternalUrl: (externalUrl: string) => void;
          backgroundColor: Color | undefined;
          setBackgroundColor: (backgroundColor: Color) => void;
          burnable: boolean | undefined;
          setBurnable: (burnable: boolean) => void;
          onlyXRP: boolean | undefined;
          setOnlyXRP: (onlyXRP: boolean) => void;
          transferable: boolean | undefined;
          setTransferable: (transferable: boolean) => void;
          attributes: MetadataAttributeDto[] | undefined;
          setAttributes: (attributes: MetadataAttributeDto[]) => void;
      }
    : {});
