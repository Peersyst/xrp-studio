import { MetadataAttributeDto } from "module/api/service";
import Color from "color";

export type CollectionCreationFieldsProps<D extends boolean = false> = {
    loading?: boolean;
    header: string | undefined;
    setHeader: (header: string | undefined) => void;
    image: string | undefined;
    setImage: (image: string | undefined) => void;
    name: string | undefined;
    setName: (name: string) => void;
    description: string | undefined;
    setDescription: (description: string) => void;
    showDefaults: D;
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
