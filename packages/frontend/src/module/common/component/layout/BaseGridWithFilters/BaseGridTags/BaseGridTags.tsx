import { Row, Typography } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import useTranslate from "module/common/hook/useTranslate";
import FilterLinesIcon from "module/common/icons/FilterLinesIcon";
import MinusCircleIcon from "module/common/icons/MinusCircleIcon";
import { useRecoilState } from "recoil";
import { Tag } from "./BaseGridTags.styles";
import { BaseGridTagsProps } from "./BaseGridTags.types";

export const BaseGridTags = ({ tags, onClear, onTagClicked }: BaseGridTagsProps): JSX.Element => {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const t = useTranslate();
    const handleClear = () => {
        onClear?.();
    };
    return (
        <Row gap="1rem" wrap alignItems="center" wrapGap="1rem" css={{ minHeight: "2.75rem" }}>
            {!showFilters && (
                <Button onClick={() => setShowFilters(true)} size="lg">
                    {t("search&Filter")}
                    <FilterLinesIcon css={{ fontSize: "1.5rem" }} />
                </Button>
            )}
            {tags?.map((tag) => (
                <Tag suffix={<MinusCircleIcon />} onClick={() => onTagClicked?.(tag)} label={tag} size="lg" />
            ))}
            {tags && tags.length > 0 ? (
                <Button appearance="outlined" onClick={handleClear} size="lg">
                    {t("clearAll")}
                </Button>
            ) : (
                <Typography variant="body1" light>
                    {t("noneApplied")}
                </Typography>
            )}
        </Row>
    );
};
