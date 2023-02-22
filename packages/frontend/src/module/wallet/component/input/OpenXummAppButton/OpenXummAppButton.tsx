import Button from "module/common/component/input/Button/Button";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import useTranslate from "module/common/hook/useTranslate";

export interface OpenXummAppButtonProps extends Omit<ButtonProps, "onClick" | "type" | "children"> {
    xummAppSignatureLink: string | undefined;
}

const OpenXummAppButton = ({
    xummAppSignatureLink,
    disabled,
    fullWidth = true,
    ...restButtonProps
}: OpenXummAppButtonProps): JSX.Element => {
    const translate = useTranslate();

    const body = (
        <Button type="button" disabled={!xummAppSignatureLink || disabled} fullWidth={fullWidth} {...restButtonProps}>
            {translate("openXummApp")}
        </Button>
    );

    return xummAppSignatureLink ? (
        <a css={{ width: fullWidth ? "100%" : undefined }} href={xummAppSignatureLink!}>
            {body}
        </a>
    ) : (
        body
    );
};

export default OpenXummAppButton;
