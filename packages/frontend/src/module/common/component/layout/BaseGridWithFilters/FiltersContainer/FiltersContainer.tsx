import { Col, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { FiltersDivider } from "../BaseGridFilters/BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "../BaseGridFilters/BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { HideFiltersWrapper } from "./FiltersContainer.styles";

function FiltersContainer<T extends PaginatedData>({ children }: BaseGridFiltersProps<T>): JSX.Element {
    const t = useTranslate();
    const setShowFilters = useSetRecoilState(filtersVisibilityState);
    const handleHideFilters = () => setShowFilters(false);
    return (
        <Typography variant="body1" light>
            <Col gap="1.25rem">
                <Col gap="1rem">
                    <HideFiltersWrapper className="hide-filters" onClick={handleHideFilters}>
                        {t("hideFilters&Search")}
                        <MenuIcon css={{ fontSize: "1.5rem" }} />
                    </HideFiltersWrapper>
                    <FiltersDivider />
                </Col>
                <Col flex={1} className="filters-cont">
                    {children}
                </Col>
            </Col>
        </Typography>
    );
}

export default FiltersContainer;
