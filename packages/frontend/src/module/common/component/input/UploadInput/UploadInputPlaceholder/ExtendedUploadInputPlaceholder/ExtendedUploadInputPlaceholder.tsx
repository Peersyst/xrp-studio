import { Col } from "@peersyst/react-components";
import { ImageUpIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../../Button/Button";
import {
    ExtendedUploadInputPlaceholderLabel,
    ExtendedUploadInputPlaceholderIcon,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/ExtendedUploadInputPlaceholder/ExtendedUploadInputPlaceholder.styles";

export interface ExtendedUploadInputPlaceholderProps {
    supportedFilesLabel?: string;
    text?: string;
}

const ExtendedUploadInputPlaceholder = ({ supportedFilesLabel, text }: ExtendedUploadInputPlaceholderProps): JSX.Element => {
    const t = useTranslate();
    return (
        <Col gap="7.5%" alignItems="center" justifyContent="center" css={{ width: "100%", height: "100%" }}>
            <ExtendedUploadInputPlaceholderIcon as={ImageUpIcon} />
            <Col gap="0.75rem">
                <ExtendedUploadInputPlaceholderLabel variant="h5">{text ?? t("fileInputPlaceholder")}</ExtendedUploadInputPlaceholderLabel>
                {supportedFilesLabel && (
                    <ExtendedUploadInputPlaceholderLabel variant="body1">{supportedFilesLabel}</ExtendedUploadInputPlaceholderLabel>
                )}
            </Col>
            <Button size="lg">{t("chooseFile")}</Button>
        </Col>
    );
};

export default ExtendedUploadInputPlaceholder;
