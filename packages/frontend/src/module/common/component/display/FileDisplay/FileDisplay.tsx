import { Col, Typography } from "@peersyst/react-components";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import FileArrayDisplay from "./FileArrayDisplay";
import { UploadInputBaseIcon } from "module/common/component/input/UploadInput/UploadInput.styles";

export interface FileDisplayProps {
    file: File | File[];
}

const FileDisplay = ({ file }: FileDisplayProps): JSX.Element => {
    const t = useTranslate();
    return (
        <>
            <UploadInputBaseIcon as={ImageIcon} />
            <Col alignItems="center" css={{ maxWidth: "80%" }}>
                {"length" in file ? (
                    <FileArrayDisplay>{file}</FileArrayDisplay>
                ) : (
                    <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
                        {file.name}
                    </Typography>
                )}
            </Col>
            <Button size="lg">{t("selectAnotherFile")}</Button>
        </>
    );
};

export default FileDisplay;
