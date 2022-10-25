import useTranslate from "module/common/hook/useTranslate";

export interface UseBaseNftPlaceholderOptions {
    readonly?: boolean;
}

export interface UseBaseNftPlaceholderResult {
    namePlaceholder?: string;
    descriptionPlaceholder?: string;
    collectionPlaceholder?: string;
    externalLinkPlaceholder?: string;
    backgroundColorPlaceholder?: string;
}

export default function ({ readonly = false }: UseBaseNftPlaceholderOptions): UseBaseNftPlaceholderResult {
    const translate = useTranslate();

    if (readonly)
        return {
            collectionPlaceholder: translate("noCollectionPlaceholder"),
        };
    else
        return {
            namePlaceholder: translate("namePlaceholder"),
            descriptionPlaceholder: translate("descriptionPlaceholder"),
            collectionPlaceholder: translate("collectionPlaceholder"),
            externalLinkPlaceholder: translate("externalLinkPlaceholder"),
            backgroundColorPlaceholder: translate("backgroundColorPlaceholder"),
        };
}
