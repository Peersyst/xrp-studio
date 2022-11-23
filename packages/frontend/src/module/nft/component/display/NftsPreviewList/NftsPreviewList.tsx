import { NftsPreviewListProps } from "module/nft/component/display/NftsPreviewList/NftsPreviewList.types";
import { Col } from "@peersyst/react-components";
import NftsPreviewListItem from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem";

const NftsPreviewList = ({ nfts, ...rest }: NftsPreviewListProps): JSX.Element => (
    <Col gap="1rem" {...rest}>
        {nfts.map((nft, i) => (
            <NftsPreviewListItem key={i} nft={nft} />
        ))}
    </Col>
);

export default NftsPreviewList;
