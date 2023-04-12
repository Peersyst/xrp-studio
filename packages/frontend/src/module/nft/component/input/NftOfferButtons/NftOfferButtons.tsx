import { Row, useModal } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import useWallet from "module/wallet/hook/useWallet";
import NftCreateOfferModal from "../../feedback/NftCreateOfferModal/NftCreateOfferModal";

export interface NftOfferButtonsProps {
    className?: string;
    style?: React.CSSProperties;
    address: string;
}

const NftOfferButtons = ({ className, address: nftAddress, style }: NftOfferButtonsProps): JSX.Element => {
    const { address: walletAddress } = useWallet();
    const { showModal } = useModal();
    const isOwner = walletAddress === nftAddress;
    return (
        <Row gap="1rem" className={cx("nft-offer-btns", className)} style={style}>
            {isOwner ? (
                <Button fullWidth onClick={() => showModal(NftCreateOfferModal)}>
                    List Nft
                </Button>
            ) : (
                <>
                    <Button fullWidth onClick={() => showModal(NftCreateOfferModal)}>
                        Buy Now
                    </Button>
                    <Button fullWidth variant="tertiary" onClick={() => showModal(NftCreateOfferModal)}>
                        Make an offer
                    </Button>
                </>
            )}
        </Row>
    );
};

export default NftOfferButtons;
