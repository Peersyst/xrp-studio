import useTranslate from "module/common/hook/useTranslate";
import { Col, Label, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { NftPublishInformationFieldProps, NftPublishInformationProps } from "./NftPublishInformation.types";
import { TFuncKey } from "react-i18next";

const NftPublishInformation = ({
    request: { issuer: issuer, transferFee: transferFee, flags: flags = {}, metadata: metadata },
    collection,
}: NftPublishInformationProps): JSX.Element => {
    const translate = useTranslate();

    const flagsEntries = Object.entries(flags);
    const hasFlags = flagsEntries.length > 0;
    const isDataProvided = hasFlags || issuer || transferFee !== undefined || metadata?.name || collection;

    const informationFields: NftPublishInformationFieldProps[] = [
        {
            title: capitalize(translate("name")),
            content: metadata?.name,
        },
        {
            title: translate("collection"),
            content: collection,
        },
        {
            title: translate("issuer"),
            content: issuer,
        },
        {
            title: translate("transferFee"),
            content: transferFee ? transferFee + "%" : undefined,
        },
    ];

    return isDataProvided ? (
        <Col flex={1} gap="1rem" justifyContent={isDataProvided ? "flex-start" : "center"}>
            {informationFields.map(
                ({ content, title }) =>
                    content && (
                        <Label key={title} label={title}>
                            <Typography variant="body1">{content}</Typography>
                        </Label>
                    ),
            )}
            {hasFlags && flags && (
                <Label label={capitalize(translate("flags"))}>
                    <Col gap={8}>
                        {flagsEntries.map(([flag, value]) => {
                            return (
                                value && (
                                    <Typography key={flag} variant="body2">
                                        {translate(flag as TFuncKey)}
                                    </Typography>
                                )
                            );
                        })}
                    </Col>
                </Label>
            )}
        </Col>
    ) : (
        <Typography variant="h6" textAlign="center">
            {translate("noDataProvided")}
        </Typography>
    );
};

export default NftPublishInformation;
