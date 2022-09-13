import { Col } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { FiltersDivider } from "../BaseGridFilters/BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "../BaseGridFilters/BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { HideFiltersButton } from "./FiltersContainer.styles";

function FiltersContainer<T extends PaginatedData, TagT>({ children }: BaseGridFiltersProps<T, TagT>): JSX.Element {
    const t = useTranslate();
    const setShowFilters = useSetRecoilState(filtersVisibilityState);
    const handleHideFilters = () => setShowFilters(false);
    return (
        <Col gap="1.25rem">
            <Col gap="1rem">
                <HideFiltersButton variant="text" size="lg" className="hide-filters" onClick={handleHideFilters}>
                    {t("hideFilters&Search")}
                    <MenuIcon className="hide-filters-icon" />
                </HideFiltersButton>
                <FiltersDivider />
            </Col>
            <Col flex={1} className="filters-cont">
                {children}
            </Col>
        </Col>
    );
}

export default FiltersContainer;
