import { Row, useModal } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { WalletIcon } from "icons";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import ConnectXummModal from "../../feedback/ConnectXummModal/ConnectXummModal";
import { ConnectXummButtonProps } from "./ConnectXummButton.types";

const ConnectXummButton = ({ className, style }: ConnectXummButtonProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const handleOnClick = () => {
        showModal(ConnectXummModal);
    };
    return (
        <Button className={cx("connect-xumm-btn", className)} style={style} onClick={handleOnClick}>
            <Row gap="0.5rem" alignItems="center" css={{ whiteSpace: "nowrap" }}>
                <WalletIcon css={{ fontSize: "1.25rem" }} />
                {translate("loginWithXumm")}
            </Row>
        </Button>
    );
};

export default ConnectXummButton;
