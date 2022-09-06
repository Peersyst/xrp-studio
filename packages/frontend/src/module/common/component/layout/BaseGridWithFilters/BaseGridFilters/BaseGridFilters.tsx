import { Animated, Col, Row, Typography, useTheme } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { BaseGridFiltersRoot, FiltersDivider, FiltersModal } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";

function HideFilters<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
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

function BaseGridFilters<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.tablet}px)`);
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const handleHide = () => {
        if (isTablet) setShowFilters(false);
    };

    return (
        <>
            {!isTablet && (
                <Animated.Slide in direction="right">
                    <BaseGridFiltersRoot>
                        <HideFilters filters={filters} />
                    </BaseGridFiltersRoot>
                </Animated.Slide>
            )}
            <FiltersModal animation="from-bottom" renderAtRoot={true} open={showFilters && isTablet} onClose={handleHide}>
                <HideFilters filters={filters} />
            </FiltersModal>
        </>
    );
}

export default BaseGridFilters;
