import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import NftInformationField from "module/nft/component/display/NftInformationField/NftInformationField";
import { NftInformationFieldProps } from "module/nft/component/display/NftInformationField/NftInformationField.types";
import { useRecoilValue } from "recoil";
import publishNftState from "module/nft/state/PublishNftState";

const NftInformation = (): JSX.Element => {
    const translate = useTranslate();
    const {
        data: { issuer: issuer, transferFee: transferFee, flags: flags, metadata: metadata, taxon: taxon },
        collection: collection,
    } = useRecoilValue(publishNftState);

    const hasFlags = flags && (flags!.burnable || flags!.onlyXRP || flags!.trustLine || flags!.transferable);
    const isDataProvided = hasFlags || issuer || transferFee || metadata!.name || taxon || collection;

    const informationFields: NftInformationFieldProps[] = [
        {
            isValid: metadata!.name !== undefined,
            title: capitalize(translate("name")),
            children: metadata!.name ? <Typography variant="body2">{metadata!.name}</Typography> : undefined,
        },
        {
            isValid: collection !== undefined,
            title: translate("collection"),
            children: collection ? <Typography variant="body2">{collection}</Typography> : undefined,
        },
        {
            isValid: issuer !== undefined,
            title: translate("issuer"),
            children: issuer ? <Typography variant="body2">{issuer}</Typography> : undefined,
        },
        {
            isValid: transferFee! >= 0,
            title: translate("transferFee"),
            children: transferFee ? <Typography variant="body2">{transferFee}%</Typography> : undefined,
        },
        {
            isValid: hasFlags,
            title: capitalize(translate("flags")),
            children: hasFlags ? (
                <Col gap={8}>
                    {flags!.burnable && <Typography variant="body2">{translate("burnable")}</Typography>}
                    {flags!.onlyXRP && <Typography variant="body2">{translate("onlyXRP")}</Typography>}
                    {flags!.trustLine && <Typography variant="body2">{translate("trustLine")}</Typography>}
                    {flags!.transferable && <Typography variant="body2">{translate("transferable")}</Typography>}
                </Col>
            ) : undefined,
        },
    ];

    return (
        <>
            <Col flex={1} gap="1rem" justifyContent={isDataProvided ? "flex-start" : "center"}>
                {isDataProvided ? (
                    informationFields.map(
                        (field) =>
                            field.isValid && (
                                <NftInformationField key={field.title} title={field.title}>
                                    {field.children}
                                </NftInformationField>
                            ),
                    )
                ) : (
                    <Typography variant="h6" textAlign="center">
                        {translate("noDataProvided")}
                    </Typography>
                )}
            </Col>
        </>
    );
};

export default NftInformation;
