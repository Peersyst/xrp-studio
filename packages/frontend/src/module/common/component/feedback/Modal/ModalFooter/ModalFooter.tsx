import { Row, useTheme } from "@peersyst/react-components";
import clsx from "clsx";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { ModalFooterProps } from "./ModalFooter.types";

const ModalFooter = ({
    className,
    style,
    cancel = true,
    onCancel,
    cancelLabel,
    isLoading,
    mainLabel,
    mainType,
    onSubmit,
}: ModalFooterProps): JSX.Element => {
    const translate = useTranslate();
    const theme = useTheme();
    return (
        <Row
            className={clsx("modal-footer", className)}
            gap={"1rem"}
            style={style}
            justifyContent="space-between"
            alignItems="center"
            breakpoint={{ width: theme.breakpoints.values.mobile, gap: "1rem" }}
        >
            {cancel && (
                <Button variant="secondary" fullWidth onClick={onCancel} disabled={isLoading}>
                    {cancelLabel || translate("cancel")}
                </Button>
            )}
            <Button variant="primary" fullWidth type={mainType} disabled={isLoading} onClick={onSubmit}>
                {mainLabel || translate("next")}
            </Button>
        </Row>
    );
};

export default ModalFooter;
