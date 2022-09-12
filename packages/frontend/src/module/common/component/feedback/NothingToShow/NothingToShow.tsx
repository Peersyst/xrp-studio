import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ReactNode } from "react";

export interface NothingToShowProps {
    display?: ReactNode;
}

const NothingToShow = ({ display }: NothingToShowProps): JSX.Element => {
    const t = useTranslate("error");
    const finalDisplay = display ?? t("nothingToShow");
    return typeof finalDisplay === "string" ? (
        <Typography variant="h4" textAlign="center" css={{ width: "100%" }} fontWeight="bold" textTransform="uppercase">
            {finalDisplay}
        </Typography>
    ) : (
        <>{display}</>
    );
};

export default NothingToShow;
