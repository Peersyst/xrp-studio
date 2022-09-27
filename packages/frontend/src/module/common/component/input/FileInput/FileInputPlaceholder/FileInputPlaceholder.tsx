import { Col, Typography } from "@peersyst/react-components";
import { ImageUpIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../Button/Button";
import { FileInputBaseIcon } from "../FileInput.styles";
import { FileInputPlaceholderLabel } from "./FileInputPlaceholder.styles";
import { FileInputPlaceholderProps } from "./FileInputPlaceholder.types";

const FileInputPlaceholder = ({ drag, supportedFilesLabel, textInputPlaceholder }: FileInputPlaceholderProps): JSX.Element => {
    const t = useTranslate();
    return drag ? (
        <Typography variant="h4" fontWeight="bold" textAlign="center">
            {t("onDragText")}
        </Typography>
    ) : (
        <>
            <FileInputBaseIcon as={ImageUpIcon} />
            <Col gap="0.75rem">
                <FileInputPlaceholderLabel size="md" variant="h5">
                    {textInputPlaceholder ?? t("fileInputPlaceholder")}
                </FileInputPlaceholderLabel>
                {supportedFilesLabel && (
                    <FileInputPlaceholderLabel size="sm" variant="body1">
                        {supportedFilesLabel}
                    </FileInputPlaceholderLabel>
                )}
            </Col>
            <Button size="lg">{t("chooseFile")}</Button>
        </>
    );
};

export default FileInputPlaceholder;
