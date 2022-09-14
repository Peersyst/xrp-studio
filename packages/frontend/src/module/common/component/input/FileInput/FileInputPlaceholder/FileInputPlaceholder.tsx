import { Col, Typography } from "@peersyst/react-components";
import { ImageUpIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../Button/Button";
import { FileInputPlaceholderIcon, FileInputPlaceholderLabel } from "./FileInputPlaceholder.styles";

export interface FileInputPlaceholderProps {
    drag: boolean;
    supportedFilesLabel?: string;
}

const FileInputPlaceholder = ({ drag, supportedFilesLabel }: FileInputPlaceholderProps): JSX.Element => {
    const t = useTranslate();
    return drag ? (
        <Typography variant="h4" fontWeight="500" textAlign="center">
            {t("onDragText")}
        </Typography>
    ) : (
        <>
            <FileInputPlaceholderIcon as={ImageUpIcon} />
            <Col gap="0.75rem">
                <FileInputPlaceholderLabel className="file-input-label-md" variant="h5">
                    {t("fileInputPlaceholder")}
                </FileInputPlaceholderLabel>
                {supportedFilesLabel && (
                    <FileInputPlaceholderLabel className="file-input-label-sm" variant="body1">
                        {supportedFilesLabel}
                    </FileInputPlaceholderLabel>
                )}
            </Col>
            <Button size="lg">{t("chooseFile")}</Button>
        </>
    );
};

export default FileInputPlaceholder;
