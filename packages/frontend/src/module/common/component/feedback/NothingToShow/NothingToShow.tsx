import { Col, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { CSSProperties, ReactNode } from "react";

export interface NothingToShowProps {
    className?: string;
    style?: CSSProperties;
    label?: string;
    children?: ReactNode;
}

const NothingToShow = ({ className, style, label, children }: NothingToShowProps): JSX.Element => {
    return (
        <Col
            className={cx("nothing-to-show", className)}
            css={{ minHeight: "12rem" }}
            style={style}
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap="2rem"
        >
            {label && (
                <Typography variant="h6" fontWeight="bold" light>
                    {label}
                </Typography>
            )}
            {children}
        </Col>
    );
};

export default NothingToShow;
