import useTranslate from "module/common/hook/useTranslate";
import { Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { NftPublishInformationProps } from "./NftPublishInformation.types";
import { TFuncKey } from "react-i18next";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";

const NftPublishInformation = ({
    request: { issuer: issuer, transferFee: transferFee, flags: flags = {}, metadata: metadata },
    collection,
}: NftPublishInformationProps): JSX.Element => {
    const translate = useTranslate();

    const flagsEntries = Object.entries(flags);
    const flagsValues = Object.values(flags || {});
    const hasFlags = !flagsValues.every((flag) => !flag);
    const isDataProvided = hasFlags || issuer || transferFee !== undefined || metadata?.name || collection;

    const informationFields: InformationField[] = [
        {
            label: capitalize(translate("name")),
            content: metadata?.name,
        },
        {
            label: translate("collection"),
            content: collection,
        },
        {
            label: translate("issuer"),
            content: issuer,
        },
        {
            label: translate("transferFee"),
            content: transferFee ? transferFee + "%" : undefined,
        },
        {
            label: capitalize(translate("flags")),
            content: hasFlags && (
                <ul css={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}>
                    {flagsEntries.map(([flag, value]) => value && <li>{translate(flag as TFuncKey)}</li>)}
                </ul>
            ),
        },
    ];

    return isDataProvided ? (
        <InformationFields fields={informationFields} />
    ) : (
        <Typography variant="h6" textAlign="center">
            {translate("noDataProvided")}
        </Typography>
    );
};

export default NftPublishInformation;
