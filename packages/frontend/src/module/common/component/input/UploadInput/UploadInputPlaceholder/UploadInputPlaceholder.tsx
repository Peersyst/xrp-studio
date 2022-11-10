import {
    CoreUploadInputPlaceholderProps,
    UploadInputPlaceholderType,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";
import { UploadInputPlaceholderRoot } from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.styles";
import { JSXElementConstructor } from "react";
import ExtendedUploadInputPlaceholder from "module/common/component/input/UploadInput/UploadInputPlaceholder/ExtendedUploadInputPlaceholder/ExtendedUploadInputPlaceholder";
import CompactUploadInputPlaceholder from "module/common/component/input/UploadInput/UploadInputPlaceholder/CompactUploadInputPlaceholder/CompactUploadInputPlaceholder";
import { cx } from "@peersyst/react-utils";

const UploadInputPlaceholders: Record<UploadInputPlaceholderType, JSXElementConstructor<any>> = {
    extended: ExtendedUploadInputPlaceholder,
    compact: CompactUploadInputPlaceholder,
};

const UploadInputPlaceholder = ({
    drag,
    disabled = false,
    type = "extended",
    variant = "primary",
    ...props
}: CoreUploadInputPlaceholderProps): JSX.Element => {
    const UploadInputPlaceholderComponent = UploadInputPlaceholders[type];

    return (
        <UploadInputPlaceholderRoot variant={variant} className={cx("upload-input-placeholder", drag && "drag", disabled && "disabled")}>
            <UploadInputPlaceholderComponent {...props} disabled={disabled} />
        </UploadInputPlaceholderRoot>
    );
};

export default UploadInputPlaceholder;
