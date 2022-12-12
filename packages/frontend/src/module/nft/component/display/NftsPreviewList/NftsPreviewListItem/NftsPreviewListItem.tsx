import { Row, Skeleton, Typography } from "@peersyst/react-components";
import { NftsPreviewListItemProps } from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem.types";
import { config } from "config";
import { NftsPreviewListItemImage } from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem.styles";

const NftsPreviewListItem = ({ nft, loading = false, ...rest }: NftsPreviewListItemProps): JSX.Element => {
    const { metadata: { name = "", image = "" } = {} } = nft || {};

    return (
        <Row gap="1.5rem" alignItems="center" {...rest}>
            <NftsPreviewListItemImage src={image} alt={(name || "nft") + "-image"} fallback={config.nftDefaultImageUrl} loading={loading} />
            <Skeleton loading={loading}>
                <Typography variant="body2" fontWeight={500} light singleLine>
                    {loading ? "Loading Name" : name}
                </Typography>
            </Skeleton>
        </Row>
    );
};

export default NftsPreviewListItem;
