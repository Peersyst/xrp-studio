import { MetadataAttributeDto } from "module/api/service";
import { ReactNode } from "react";
import Color from "color";
import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";
import { CollectionCreationForm, CollectionCreationNft } from "module/collection/types";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";

export type CollectionCreationAction = "save" | "publish" | "launch";

export type CollectionCreationPageScaffoldProps<D extends boolean = false> = {
    loading?: boolean;
    backPath?: CollectionRoutes;
    title: string;
    actions: ActionButtonProps<CollectionCreationAction>[];
    totalNfts: number;
    drafts: CollectionCreationNft[] | undefined;
    draftLink: (draft: CollectionCreationNft) => string;
    onDraftsAdded: (drafts: CollectionCreationNft[]) => Promise<void> | void;
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
    onSubmit: (data: CollectionCreationForm, action: CollectionCreationAction) => void;
    children?: ReactNode;
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
