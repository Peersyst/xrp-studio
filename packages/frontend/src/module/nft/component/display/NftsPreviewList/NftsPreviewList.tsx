import { NftsPreviewListProps } from "module/nft/component/display/NftsPreviewList/NftsPreviewList.types";
import { Col } from "@peersyst/react-components";
import NftsPreviewListItem from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem";
import { NftsPreviewListItemSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";

const NftsPreviewList = ({ nfts = [], loading = false, ...rest }: NftsPreviewListProps): JSX.Element => (
    <Col gap="1rem" {...rest}>
        {loading ? <NftsPreviewListItemSkeletons count={3} /> : nfts.map((nft, i) => <NftsPreviewListItem key={i} nft={nft} />)}
    </Col>
);

export default NftsPreviewList;
