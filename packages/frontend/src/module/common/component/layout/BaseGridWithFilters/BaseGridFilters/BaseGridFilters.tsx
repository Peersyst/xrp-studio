import { Animated, Col, Divider, Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import MenuIcon from "module/common/icons/MenuIcon";
import { BaseGridFiltersRoot } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useSetRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";

function HideFilters<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
    const t = useTranslate();
    const setShowFilters = useSetRecoilState(filtersVisibilityState);
    const handleHideFilters = () => setShowFilters(false);
    return (
        <Typography variant="body1" light>
            <Col gap="1.5rem">
                <Row css={{ cursor: "pointer" }} justifyContent="flex-end" alignItems="center" gap="0.5rem" onClick={handleHideFilters}>
                    {t("hideFilters&Search")}
                    <MenuIcon css={{ fontSize: "1.5rem" }} />
                </Row>
                <Divider />
                {filters}
            </Col>
        </Typography>
    );
}

function BaseGridFilters<T extends PaginatedData>({ filters }: BaseGridFiltersProps<T>): JSX.Element {
    return (
        <Animated.Slide in direction="right">
            <BaseGridFiltersRoot>
                <HideFilters filters={filters} />
            </BaseGridFiltersRoot>
        </Animated.Slide>
    );
}

export default BaseGridFilters;
