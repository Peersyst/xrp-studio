import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { NftInformationCard } from "module/nft/component/display/NftInformation/NftInformation.styles";
import { capitalize } from "@peersyst/react-utils";
import { NftInformationProps } from "module/nft/component/display/NftInformation/NftInformation.types";
import NftInformationField from "module/nft/component/display/NftInformationField/NftInformationField";
import { NftInformationFieldProps } from "module/nft/component/display/NftInformationField/NftInformationField.types";

const NftInformation = ({
    data: { issuer, transferFee, flags, metadata, taxon },
    collections: collections,
}: NftInformationProps): JSX.Element => {
    const translate = useTranslate();
    const hasFlags = flags && (flags!.burnable || flags!.onlyXRP || flags!.trustLine || flags!.transferable);
    const isDataProvided = hasFlags || issuer || transferFee || metadata!.name || taxon;

    const collection = collections.find((el) => el.taxon === taxon);

    const informationFields: NftInformationFieldProps[] = [
        {
            isValid: metadata!.name !== undefined,
            title: capitalize(translate("name")),
            children: <Typography variant="body2">{metadata!.name}</Typography>,
        },
        {
            isValid: collection !== undefined,
            title: translate("collection"),
            children: <Typography variant="body2">{collection!.name}</Typography>,
        },
        {
            isValid: issuer !== undefined,
            title: translate("issuer"),
            children: <Typography variant="body2">{issuer}</Typography>,
        },
        {
            isValid: transferFee! >= 0,
            title: translate("transferFee"),
            children: <Typography variant="body2">{transferFee}%</Typography>,
        },
        {
            isValid: hasFlags,
            title: capitalize(translate("flags")),
            children: (
                <Col gap={8}>
                    {flags!.burnable && <Typography variant="body2">{translate("burnable")}</Typography>}
                    {flags!.onlyXRP && <Typography variant="body2">{translate("onlyXRP")}</Typography>}
                    {flags!.trustLine && <Typography variant="body2">{translate("trustLine")}</Typography>}
                    {flags!.transferable && <Typography variant="body2">{translate("transferable")}</Typography>}
                </Col>
            ),
        },
    ];

    return (
        <NftInformationCard>
            <Col gap="1rem">
                {isDataProvided ? (
                    informationFields.map(
                        (field) => field.isValid && <NftInformationField title={field.title}>{field.children}</NftInformationField>,
                    )
                ) : (
                    <Typography variant="h6">{translate("noDataProvided")}</Typography>
                )}
            </Col>
        </NftInformationCard>
    );
};

export default NftInformation;
