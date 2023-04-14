import { Row, useModal } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { NftDto } from "module/api/service";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook/useWallet";
import BuyNftModal from "../../feedback/BuyNftModal/BuyNftModal";
import NftCreateOfferModal from "../../feedback/NftCreateOfferModal/NftCreateOfferModal";

export interface NftOfferButtonsProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

const NftOfferButtons = ({ className, nft, style }: NftOfferButtonsProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const { user: { address: nftOwnerAddress } = {} } = nft;
    const { address: walletAddress } = useWallet();
    const isOwner = walletAddress === nftOwnerAddress;

    return (
        <Row gap="1rem" className={cx("nft-offer-btns", className)} style={style}>
            {isOwner ? (
                <Button fullWidth onClick={() => showModal(NftCreateOfferModal, { nft })}>
                    {translate("listNft")}
                </Button>
            ) : (
                <>
                    <Button fullWidth onClick={() => showModal(BuyNftModal, { nft })}>
                        {translate("buyNow")}
                    </Button>
                    {/*TODO: Enable that users create custom offers*/}
                </>
            )}
        </Row>
    );
};

export default NftOfferButtons;
