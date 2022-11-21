import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import InformationField from "module/common/component/display/InformationField/InformationField";
import { NftInformationFieldProps, NftInformationProps } from "./NftInformation.types";
import { NftFlagsRequest } from "module/api/service";

const NftInformation = ({
    request: { issuer: issuer, transferFee: transferFee, flags: flags, metadata: metadata },
    collection,
}: NftInformationProps): JSX.Element => {
    const translate = useTranslate();

    const flagsKeys = Object.keys(flags || {}) as (keyof NftFlagsRequest)[];
    const flagsValues = Object.values(flags || {});
    flagsValues.length;
    const hasFlags = flagsValues.find((flag) => flag);
    const isDataProvided = hasFlags || issuer || transferFee !== undefined || metadata?.name || collection;

    const informationFields: NftInformationFieldProps[] = [
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

    return (
        <>
            {isDataProvided ? (
                <Col flex={1} gap="1rem" justifyContent="flex-start">
                    {informationFields.map(
                        ({ content, title }) =>
                            content && (
                                <InformationField key={title} title={title}>
                                    {content}
                                </InformationField>
                            ),
                    )}
                    {hasFlags && (
                        <InformationField title={capitalize(translate("flags"))}>
                            <Col gap={8}>
                                {flagsKeys.map((key) => {
                                    return (
                                        !flags ||
                                        (flags[key] && (
                                            <Typography key={key} variant="body2">
                                                {translate(key)}
                                            </Typography>
                                        ))
                                    );
                                })}
                            </Col>
                        </InformationField>
                    )}
                </Col>
            ) : (
                <Col flex={1} justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                    <Typography variant="h6" fontWeight={700}>
                        {translate("noDataProvided")}
                    </Typography>
                </Col>
            )}
        </>
    );
};

export default NftInformation;
