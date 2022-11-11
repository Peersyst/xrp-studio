import { BaseNftPageContentCard } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent.styles";
import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { NftInformationPorps } from "module/nft/component/display/NftInformation/NftInformation.types";

const NftInformation = ({ data: { issuer, transferFee, flags, metadata, taxon } }: NftInformationPorps): JSX.Element => {
    const translate = useTranslate();

    return (
        <BaseNftPageContentCard>
            <Col gap="1rem">
                <Typography variant="body1" fontWeight={700}>
                    Name:{" "}
                </Typography>
                <Typography variant="body2">{metadata!.name}</Typography>

                {taxon && (
                    <>
                        <Typography variant="body1" fontWeight={700}>
                            Collection:{" "}
                        </Typography>
                        <Typography variant="body2">{taxon}</Typography>
                    </>
                )}
                {issuer && (
                    <>
                        <Typography variant="body1" fontWeight={700}>
                            Issuer:
                        </Typography>
                        <Typography variant="body2">{issuer}</Typography>
                    </>
                )}
                {transferFee && (
                    <>
                        <Typography variant="body1" fontWeight={700}>
                            Transfer Fee:{" "}
                        </Typography>
                        <Typography variant="body2">{transferFee}%</Typography>
                    </>
                )}
                {flags && (
                    <>
                        <Typography variant="body1" fontWeight={700}>
                            Flags:
                        </Typography>
                        <Col gap={8}>
                            {flags.burnable && <Typography variant="body2">{translate("burnable")}</Typography>}
                            {flags.onlyXRP && <Typography variant="body2">{translate("onlyXRP")}</Typography>}
                            {flags.trustLine && <Typography variant="body2">{translate("trustLine")}</Typography>}
                            {flags.transferable && <Typography variant="body2">{translate("transferable")}</Typography>}
                        </Col>
                    </>
                )}
            </Col>
        </BaseNftPageContentCard>
    );
};

export default NftInformation;
