import { Col, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

export interface FileArrayDisplayProps {
    children: File[];
}

const FileArrayDisplay = ({ children }: FileArrayDisplayProps): JSX.Element => {
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

export default FileArrayDisplay;
