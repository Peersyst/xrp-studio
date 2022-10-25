import { Col, Typography } from "@peersyst/react-components";
import { ImageUpIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../Button/Button";
import {
    UploadInputPlaceholderLabel,
    UploadInputPlaceholderRoot,
} from "module/common/component/input/UploadInput/FileInputPlaceholder/UploadInputPlaceholder.styles";
import { UploadInputBaseIcon } from "../UploadInput.styles";
import { UploadInputPlaceholderProps } from "module/common/component/input/UploadInput/FileInputPlaceholder/UploadInputPlaceholder.types";

const UploadInputPlaceholder = ({ drag, supportedFilesLabel, textInputPlaceholder }: UploadInputPlaceholderProps): JSX.Element => {
    const t = useTranslate();
    return (
        <UploadInputPlaceholderRoot>
            {drag ? (
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    {t("onDragText")}
                </Typography>
            ) : (
                <>
                    <UploadInputBaseIcon as={ImageUpIcon} />
                    <Col gap="0.75rem">
                        <UploadInputPlaceholderLabel size="md" variant="h5">
                            {textInputPlaceholder ?? t("fileInputPlaceholder")}
                        </UploadInputPlaceholderLabel>
                        {supportedFilesLabel && (
                            <UploadInputPlaceholderLabel size="sm" variant="body1">
                                {supportedFilesLabel}
                            </UploadInputPlaceholderLabel>
                        )}
                    </Col>
                    <Button size="lg">{t("chooseFile")}</Button>
                </>
            )}
        </UploadInputPlaceholderRoot>
    );
};

export default UploadInputPlaceholder;
