import { Col, Typography } from "@peersyst/react-components";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../input/Button/Button";
import FileArrayDisplay from "./FileArrayDisplay";

export interface FileDisplayProps {
    file: File | File[];
}

const FileDisplay = ({ file }: FileDisplayProps): JSX.Element => {
    const t = useTranslate();
    return (
        <>
            <ImageIcon css={{ fontSize: "750%" }} />
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
