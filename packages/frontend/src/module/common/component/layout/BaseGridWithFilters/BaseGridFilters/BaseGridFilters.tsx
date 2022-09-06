import { Animated, Col, Row, Typography, useTheme } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { BaseGridFiltersRoot, FiltersDivider } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
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
                {filters}
            </Col>
        </Typography>
    );
}

function BaseGridFilters<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { mini },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${mini}px)`);
    return (
        <>
            {!isTablet && (
                <Animated.Slide in direction="right">
                    <BaseGridFiltersRoot>
                        <HideFilters filters={filters} />
                    </BaseGridFiltersRoot>
                </Animated.Slide>
            )}
        </>
    );
}

export default BaseGridFilters;
