import { Animated, useTheme } from "@peersyst/react-components";
import { BaseGridFiltersRoot, FiltersModal } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";
import FiltersContainer from "../FiltersContainer/FiltersContainer";
import useStickyHeader from "module/common/component/layout/PageHeader/hook/useStickyHeader";

function BaseGridFilters<T extends PaginatedData, TagT>({ visible, children }: BaseGridFiltersProps<T, TagT>): JSX.Element {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const isHeaderSticky = useStickyHeader();
    const handleHide = () => {
        if (isTablet) setShowFilters(false);
    };

    return isTablet ? (
        <FiltersModal animation="from-bottom" open={showFilters} onClose={handleHide}>
            <FiltersContainer>{children}</FiltersContainer>
        </FiltersModal>
    ) : (
        <Animated.Slide in={visible} direction="right" duration={500}>
            <BaseGridFiltersRoot isHeaderSticky={isHeaderSticky}>
                <FiltersContainer>{children}</FiltersContainer>
            </BaseGridFiltersRoot>
        </Animated.Slide>
    );
}

export default BaseGridFilters;
