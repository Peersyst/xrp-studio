import { Row, useModal } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { NftDto } from "module/api/service";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import BuyNftModal, { BuyNftModalType } from "../../feedback/BuyNftModal/BuyNftModal";
import TransferNftModal from "../../feedback/TransferNftModal/TransferNftModal";
import useNftOfferButtons from "./hooks/useNftOfferButtons";

export interface NftOfferButtonsProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

const NftOfferButtons = ({ className, nft, style }: NftOfferButtonsProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const { isOwner, canTransfer, canAccept, acceptableOffer, hasAddress } = useNftOfferButtons({ nft });
    const showButtons = hasAddress && (canAccept || canTransfer);

    return (
        <>
            {showButtons && (
                <Row gap="1rem" className={cx("nft-offer-btns", className)} style={style}>
                    {isOwner ? (
                        <>
                            {canTransfer && (
                                <Button fullWidth onClick={() => showModal(TransferNftModal, { nft })}>
                                    {translate("transfer")}
                                </Button>
                            )}
                            {/*TODO: Enable cancel Tx and Listing*/}
                            {/*TODO: Enable listing*/}
                        </>
                    ) : (
                        <>
                            {canAccept && (
                                <Button
                                    fullWidth
                                    onClick={() =>
                                        showModal(BuyNftModal, { nft, offer: acceptableOffer!, type: BuyNftModalType.ACCEPT_TRANSFER })
                                    }
                                >
                                    {translate("acceptTransfer")}
                                </Button>
                            )}
                            {/*TODO: Enable that users to accept offers (BUY)*/}
                            {/*TODO: Enable that users create custom offers*/}
                        </>
                    )}
                </Row>
            )}
        </>
    );
};

export default NftOfferButtons;
