import { useModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import useWallet from "module/wallet/hook/useWallet";
import { BuyNftDropProps } from "./ButtonBuyNftDrop.types";

const ButtonBuyNftDrop = ({ disabled = false, dropId }: BuyNftDropProps): JSX.Element => {
    const translate = useTranslate();
    const { isLogged } = useWallet();
    const { showModal } = useModal();
    const { mutate: buyNftDrop } = useBuyNftDrop();

    const onBuyNftDrop = () => {
        isLogged
            ? buyNftDrop(dropId)
            : showModal(ConnectXummModal, {
                  onClose: () => {
                      buyNftDrop(dropId);
                  },
              });
    };

    return (
        <Button style={{ alignSelf: "center" }} onClick={onBuyNftDrop} disabled={disabled}>
            {translate("mint")}
        </Button>
    );
};

export default ButtonBuyNftDrop;
