import { Col, Typography } from "@peersyst/react-components";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../Button/Button";

export interface FileDisplayProps {
    file: File;
}

const FileDisplay = ({ file }: FileDisplayProps): JSX.Element => {
    const t = useTranslate();
    return (
        <Col alignItems="center" gap="2rem" css={{ maxWidth: "100%" }}>
            <Col alignItems="center" gap="0.5rem" css={{ maxWidth: "100%" }}>
                <ImageIcon css={{ fontSize: "8rem" }} />
                <Typography variant="h6" fontWeight="800" textAlign="center" singleLine>
                    {file.name}
                </Typography>
            </Col>
            <Button size="lg">{t("selectAnotherFile")}</Button>
        </Col>
    );
};

export default FileDisplay;