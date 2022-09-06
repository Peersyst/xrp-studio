import { Col, Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { FiltersDivider } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";

function FiltersContainer<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
    const t = useTranslate();
    const setShowFilters = useSetRecoilState(filtersVisibilityState);
    const handleHideFilters = () => setShowFilters(false);
    return (
        <Typography variant="body1" light>
            <Col gap="1.5rem">
                <Col gap="1.6rem">
                    <Row
                        className="hide-filters"
                        css={{ cursor: "pointer" }}
                        justifyContent="flex-end"
                        alignItems="center"
                        gap="0.75rem"
                        onClick={handleHideFilters}
                    >
                        {t("hideFilters&Search")}
                        <MenuIcon css={{ fontSize: "1.5rem" }} />
                    </Row>
                    <FiltersDivider />
                </Col>
                <Col flex={1} className="filters-cont">
                    {filters}
                </Col>
            </Col>
        </Typography>
    );
}

export default FiltersContainer;
