import { Col, Typography } from "@peersyst/react-components";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import Button from "../../Button/Button";

export interface FileArrayDisplayProps {
    children: File[];
}

export interface FileDisplayProps {
    file: File | File[];
}

const FileArrayDisplay = ({ children }: FileArrayDisplayProps) => {
    const t = useTranslate();
    return children.length === 1 ? (
        <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
            {children[0].name}
        </Typography>
    ) : (
        <Col css={{ maxWidth: "100%" }}>
            <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
                {children[0].name}
            </Typography>
            <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
                {t("andNMoreItems", { count: children.length - 1 })}
            </Typography>
        </Col>
    );
};

const FileDisplay = ({ file }: FileDisplayProps): JSX.Element => {
    const t = useTranslate();
    return (
        <Col alignItems="center" gap="1.5rem" css={{ width: "100%" }}>
            <Col alignItems="center" gap="0.75rem" css={{ maxWidth: "80%" }}>
                <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
                    <ImageIcon css={{ fontSize: "8.5rem" }} />
                </Typography>
                {"length" in file ? (
                    <FileArrayDisplay>{file}</FileArrayDisplay>
                ) : (
                    <Typography light variant="h6" fontWeight="800" textAlign="center" singleLine>
                        {file.name}
                    </Typography>
                )}
            </Col>
            <Button size="lg">{t("selectAnotherFile")}</Button>
        </Col>
    );
};

export default FileDisplay;
