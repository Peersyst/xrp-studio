import useTranslate from "module/common/hook/useTranslate";
import { Row, Typography } from "@peersyst/react-components";
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
            content: transferFee ? Number(transferFee / 1000) + "%" : undefined,
        },
        {
            label: capitalize(translate("flags")),
            content: hasFlags && (
                <ul css={{ display: "flex", flexDirection: "column", rowGap: "0.5rem", listStyleType: "none" }}>
                    {flagsEntries.map(([flag, value]) => value && <li key={flag}>{translate(flag as TFuncKey)}</li>)}
                </ul>
            ),
        },
    ];

    return isDataProvided ? (
        <InformationFields fields={informationFields} />
    ) : (
        <Row flex={1} justifyContent="center" alignItems="center">
            <Typography variant="h6" textAlign="center">
                {translate("noDataProvided")}
            </Typography>
        </Row>
    );
};

export default NftPublishInformation;
