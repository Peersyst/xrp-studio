import { Row, Typography } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import useTranslate from "module/common/hook/useTranslate";
import FilterLinesIcon from "module/common/icons/FilterLinesIcon";
import { useRecoilState } from "recoil";
import { BaseGridTagsProps } from "./BaseGridTags.types";

export const BaseGridTags = ({ children }: BaseGridTagsProps): JSX.Element => {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const t = useTranslate();

    return (
        <Row gap="1rem" wrap alignItems="center" wrapGap="1rem" css={{ minHeight: "2.75rem" }}>
            {!showFilters && (
                <Button onClick={() => setShowFilters(true)}>
                    {t("search&Filter")}
                    <FilterLinesIcon css={{ fontSize: "1.25rem" }} />
                </Button>
            )}
            {children}
            {children && children.length > 0 ? (
                <Button appearance="outlined">{t("clearAll")}</Button>
            ) : (
                <Typography variant="body1" light>
                    {t("noneApplied")}
                </Typography>
            )}
        </Row>
    );
};
