import {
    UploadInputPlaceholderProps,
    UploadInputPlaceholderType,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";
import { UploadInputPlaceholderRoot } from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.styles";
import { JSXElementConstructor } from "react";
import ExtendedUploadInputPlaceholder from "module/common/component/input/UploadInput/UploadInputPlaceholder/ExtendedUploadInputPlaceholder/ExtendedUploadInputPlaceholder";
import CompactUploadInputPlaceholder from "module/common/component/input/UploadInput/UploadInputPlaceholder/CompactUploadInputPlaceholder/CompactUploadInputPlaceholder";

const UploadInputPlaceholders: Record<UploadInputPlaceholderType, JSXElementConstructor<any>> = {
    extended: ExtendedUploadInputPlaceholder,
    compact: CompactUploadInputPlaceholder,
};

const UploadInputPlaceholder = ({ type = "extended", ...props }: UploadInputPlaceholderProps): JSX.Element => {
    const UploadInputPlaceholderComponent = UploadInputPlaceholders[type];

    return (
        <UploadInputPlaceholderRoot>
            <UploadInputPlaceholderComponent {...props} />
        </UploadInputPlaceholderRoot>
    );
};

export default UploadInputPlaceholder;
