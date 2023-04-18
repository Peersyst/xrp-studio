import clsx from "clsx";
import ModalFooter from "../../Modal/ModalFooter/ModalFooter";
import useCloseTabModal from "../hooks/useCloseTabModal";
import { TabsModalFooterProps } from "./TabsModalFooter.types";

const TabsModalFooter = ({ className, ...rest }: TabsModalFooterProps): JSX.Element => {
    //hooks
    const handleCancel = useCloseTabModal();

    return <ModalFooter className={clsx("tabs-modal-footer", className)} onCancel={handleCancel} {...rest} />;
};

export default TabsModalFooter;
