import { Row, Typography } from "@peersyst/react-components";
import { NftsPreviewListItemProps } from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem.types";
import { config } from "config";
import { NftsPreviewListItemImage } from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem.styles";

const NftsPreviewListItem = ({ nft: { metadata: { name = "", image = "" } = {} }, ...rest }: NftsPreviewListItemProps): JSX.Element => (
    <Row gap="1.5rem" alignItems="center" {...rest}>
        <NftsPreviewListItemImage src={image} alt={(name || "nft") + "-image"} fallback={config.nftDefaultCoverUrl} />
        <Typography variant="body2" fontWeight={500} light singleLine>
            {name}
        </Typography>
    </Row>
);

export default NftsPreviewListItem;
