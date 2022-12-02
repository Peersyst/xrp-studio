import Button from "module/common/component/input/Button/Button";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import useTranslate from "module/common/hook/useTranslate";
import FilterLinesIcon from "module/common/icons/FilterLinesIcon";
import DeleteIcon from "module/common/icons/MinusCircleIcon";
import { useRecoilState } from "recoil";
import { BaseGridTagsRoot, Tag, TagCarousel } from "./BaseGridTags.styles";
import { BaseGridTagsProps } from "./BaseGridTags.types";

function BaseGridTags<T>({ tags, onDeleteTagClicked }: BaseGridTagsProps<T>): JSX.Element {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const t = useTranslate();

    return (
        <BaseGridTagsRoot>
            {!showFilters && (
                <Button onClick={() => setShowFilters(true)} size="md">
                    {t("search&Filter")}
                    <FilterLinesIcon css={{ fontSize: "1.5rem" }} />
                </Button>
            )}
            {tags !== undefined && tags.length !== 0 && (
                <TagCarousel arrowSize="sm">
                    {tags.map(({ label, value }, index) => (
                        <Tag
                            suffix={<DeleteIcon css={{ cursor: "pointer" }} onClick={() => onDeleteTagClicked?.(value)} />}
                            key={index}
                            label={label}
                            size="lg"
                        />
                    ))}
                </TagCarousel>
            )}
        </BaseGridTagsRoot>
    );
}

export default BaseGridTags;
