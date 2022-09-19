import { Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import { CSSProperties, ReactNode } from "react";

export interface NothingToShowProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const NothingToShow = ({ children, className, style }: NothingToShowProps): JSX.Element => {
    const t = useTranslate("error");
    const finalDisplay = children ?? t("nothingToShow");
    return typeof finalDisplay === "string" ? (
        <Typography
            className={cx("nothing-to-show", className)}
            style={style}
            variant="h4"
            textAlign="center"
            css={{ width: "100%" }}
            fontWeight="bold"
            textTransform="uppercase"
        >
            {finalDisplay}
        </Typography>
    ) : (
        <>{children}</>
    );
};

export default NothingToShow;
