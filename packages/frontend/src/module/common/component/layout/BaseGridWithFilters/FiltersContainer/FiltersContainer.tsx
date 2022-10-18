import { Col } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { FiltersDivider } from "../BaseGridFilters/BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "../BaseGridFilters/BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import Button from "module/common/component/input/Button/Button";

function FiltersContainer<T extends PaginatedData, TagT>({ children }: BaseGridFiltersProps<T, TagT>): JSX.Element {
    const t = useTranslate();
    const setShowFilters = useSetRecoilState(filtersVisibilityState);
    const handleHideFilters = () => setShowFilters(false);
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <Button variant="text" size="lg" className="hide-filters" onClick={handleHideFilters}>
                    {t("hideFilters&Search")}
                    <MenuIcon css={{ fontSize: "1.5rem" }} />
                </Button>
                <FiltersDivider />
            </Col>
            <Col flex={1} className="filters-cont">
                {children}
            </Col>
        </Col>
    );
}

export default FiltersContainer;
