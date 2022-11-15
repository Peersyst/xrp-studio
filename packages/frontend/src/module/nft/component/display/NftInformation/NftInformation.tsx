import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { NftInformationCard } from "module/nft/component/display/NftInformation/NftInformation.styles";
import { capitalize } from "@peersyst/react-utils";
import { NftInformationProps } from "module/nft/component/display/NftInformation/NftInformation.types";

const NftInformation = ({
    data: { issuer, transferFee, flags, metadata, taxon },
    collections: collections,
}: NftInformationProps): JSX.Element => {
    const translate = useTranslate();
    const hasFlags = flags && (flags!.burnable || flags!.onlyXRP || flags!.trustLine || flags!.transferable);
    const isDataProvided = hasFlags || issuer || transferFee || metadata!.name || taxon;

    const collection = collections.find((el) => el.taxon === taxon);

    return (
        <NftInformationCard>
            <Col gap="1rem">
                {isDataProvided ? (
                    <>
                        {metadata!.name && (
                            <>
                                <Typography variant="body1" fontWeight={700}>
                                    {capitalize(translate("name"))}:
                                </Typography>
                                <Typography variant="body2">{metadata!.name}</Typography>
                            </>
                        )}
                        {collection && (
                            <>
                                <Typography variant="body1" fontWeight={700}>
                                    {capitalize(translate("collection"))}:
                                </Typography>
                                <Typography variant="body2">{collection.name}</Typography>
                            </>
                        )}
                        {issuer && (
                            <>
                                <Typography variant="body1" fontWeight={700}>
                                    {capitalize(translate("issuer"))}:
                                </Typography>
                                <Typography variant="body2">{issuer}</Typography>
                            </>
                        )}
                        {transferFee! >= 0 && (
                            <>
                                <Typography variant="body1" fontWeight={700}>
                                    {translate("transferFee")}:
                                </Typography>
                                <Typography variant="body2">{transferFee}%</Typography>
                            </>
                        )}
                        {hasFlags && (
                            <>
                                <Typography variant="body1" fontWeight={700}>
                                    {capitalize(translate("flags"))}:
                                </Typography>
                                <Col gap={8}>
                                    {flags!.burnable && <Typography variant="body2">{translate("burnable")}</Typography>}
                                    {flags!.onlyXRP && <Typography variant="body2">{translate("onlyXRP")}</Typography>}
                                    {flags!.trustLine && <Typography variant="body2">{translate("trustLine")}</Typography>}
                                    {flags!.transferable && <Typography variant="body2">{translate("transferable")}</Typography>}
                                </Col>
                            </>
                        )}
                    </>
                ) : (
                    <Typography variant="h6">No data provided</Typography>
                )}
            </Col>
        </NftInformationCard>
    );
};

export default NftInformation;
