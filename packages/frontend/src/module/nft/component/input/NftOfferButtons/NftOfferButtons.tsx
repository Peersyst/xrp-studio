import { Row, useModal } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook/useWallet";
import NftCreateOfferModal from "../../feedback/NftCreateOfferModal/NftCreateOfferModal";
export interface NftOfferButtonsProps {
    className?: string;
    style?: React.CSSProperties;
    address: string;
}

const NftOfferButtons = ({ className, address: nftAddress, style }: NftOfferButtonsProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    const { address: walletAddress } = useWallet();
    const isOwner = walletAddress === nftAddress;

    return (
        <Row gap="1rem" className={cx("nft-offer-btns", className)} style={style}>
            {isOwner ? (
                <Button fullWidth onClick={() => showModal(NftCreateOfferModal)}>
                    {translate("listNft")}
                </Button>
            ) : (
                <>
                    <Button fullWidth onClick={() => showModal(NftCreateOfferModal)}>
                        {translate("buyNow")}
                    </Button>
                    {/*TODO: Add make and offer button */}
                </>
            )}
        </Row>
    );
};

export default NftOfferButtons;
