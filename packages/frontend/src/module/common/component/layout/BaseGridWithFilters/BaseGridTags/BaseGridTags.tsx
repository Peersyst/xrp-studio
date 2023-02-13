import Button from "module/common/component/input/Button/Button";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import useTranslate from "module/common/hook/useTranslate";
import FilterLinesIcon from "module/common/icons/FilterLinesIcon";
import DeleteIcon from "module/common/icons/MinusCircleIcon";
import { useRecoilState } from "recoil";
import { BaseGridTagsRoot, Tag, TagCarousel } from "./BaseGridTags.styles";
import { BaseGridTagsProps } from "./BaseGridTags.types";

function BaseGridTags<T>({ tags, onClear, onDeleteTagClicked, withExtraSpace }: BaseGridTagsProps<T>): JSX.Element {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const translate = useTranslate();

    const handleFiltersVisibility = () => {
        setShowFilters((prevShowFilters) => !prevShowFilters);
    };

    const handleClear = () => {
        onClear?.();
    };

    return (
        <BaseGridTagsRoot withExtraSpace={!!withExtraSpace}>
            <Button onClick={handleFiltersVisibility} size="md">
                {translate(showFilters ? "hideFilters" : "showFilters")}
                <FilterLinesIcon css={{ fontSize: "1.5rem" }} />
            </Button>
            {tags.length !== 0 && (
                <TagCarousel key={tags.length} arrowSize="sm">
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
            {tags && tags.length > 0 && (
                <Button variant="outlined" onClick={handleClear} size="md">
                    {translate("clearAll")}
                </Button>
            )}
        </BaseGridTagsRoot>
    );
}

export default BaseGridTags;
