import { createModal } from "@peersyst/react-components";
import clsx from "clsx";
import useTranslate from "module/common/hook/useTranslate";
import NftCreateOfferModal from "../NftCreateOfferModal/NftCreateOfferModal";
import { CreateNftOfferModalType, NftCreateOfferModalProps } from "../NftCreateOfferModal/NftCreateOfferModal.types";

export interface TransferNftModalProps extends Omit<NftCreateOfferModalProps, "type" | "title"> {}

const TransferNftModal = createModal<TransferNftModalProps>(({ className, ...rest }) => {
    const translate = useTranslate();
    return (
        <NftCreateOfferModal
            title={translate("transfer")}
            className={clsx("transfer-nft-modal", className)}
            type={CreateNftOfferModalType.TRANSFER}
            {...rest}
        />
    );
});

export default TransferNftModal;
