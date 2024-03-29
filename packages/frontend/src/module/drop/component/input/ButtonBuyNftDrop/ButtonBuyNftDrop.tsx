import { useModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import ConnectXummModal from "module/wallet/component/feedback/ConnectXummModal/ConnectXummModal";
import useWallet from "module/wallet/hook/useWallet";
import DropNftBuyModal from "module/drop/component/feedback/DropNftBuyModal/DropNftBuyModal";
import { BuyNftDropProps } from "./ButtonBuyNftDrop.types";
import { ButtonBuyNftInDropRoot } from "./ButtonBuyNftInDrop.styles";

const ButtonBuyNftDrop = ({ disabled = false, dropId }: BuyNftDropProps): JSX.Element => {
    const translate = useTranslate();
    const { isLogged } = useWallet();
    const { showModal } = useModal();
    const { mutate: buyNftDrop } = useBuyNftDrop();

    const onBuyNftDrop = () => {
        isLogged
            ? showModal(DropNftBuyModal, { dropId: dropId })
            : showModal(ConnectXummModal, {
                  onSignIn: () => {
                      buyNftDrop(dropId);
                  },
              });
    };

    return (
        <ButtonBuyNftInDropRoot css={{ alignSelf: "center" }} onClick={onBuyNftDrop} disabled={disabled}>
            {translate("mint")}
        </ButtonBuyNftInDropRoot>
    );
};

export default ButtonBuyNftDrop;
