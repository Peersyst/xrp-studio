import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";

export interface CollectionInformationProps {
    header: string | undefined;
    image: string | undefined;
    name: string | undefined;
    collection?: string | undefined;
    items: number | undefined;
    loading?: boolean;
    additionalFields?: InformationField[];
}
