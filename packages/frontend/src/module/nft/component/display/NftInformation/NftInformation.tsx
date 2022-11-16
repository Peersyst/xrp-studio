import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useRecoilValue } from "recoil";
import publishNftState from "module/nft/state/PublishNftState";
import InformationField from "module/common/component/display/InformationField/InformationField";
import { NftInformationFieldProps } from "./NftInformation.types";
import { NftFlagsRequest } from "module/api/service";

const NftInformation = (): JSX.Element => {
    const translate = useTranslate();
    const {
        data: { issuer: issuer, transferFee: transferFee, flags: flags, metadata: metadata },
        collection: collection,
    } = useRecoilValue(publishNftState);

    const flagsKeys = Object.keys(flags || {}) as (keyof NftFlagsRequest)[];
    const hasFlags = flagsKeys.length > 0;
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
            content: transferFee,
        },
    ];

    return (
        <Col flex={1} gap="1rem" justifyContent={isDataProvided ? "flex-start" : "center"}>
            {isDataProvided ? (
                <>
                    {informationFields.map(
                        ({ content, title }) =>
                            content && (
                                <InformationField key={title} title={title}>
                                    {content}
                                </InformationField>
                            ),
                    )}
                    {hasFlags && (
                        <InformationField title={translate("flags")}>
                            <Col gap={8}>
                                {flagsKeys.map((key) => (
                                    <Typography variant="body2">{translate(key)}</Typography>
                                ))}
                            </Col>
                        </InformationField>
                    )}
                </>
            ) : (
                <Typography variant="h6" textAlign="center">
                    {translate("noDataProvided")}
                </Typography>
            )}
        </Col>
    );
};

export default NftInformation;
