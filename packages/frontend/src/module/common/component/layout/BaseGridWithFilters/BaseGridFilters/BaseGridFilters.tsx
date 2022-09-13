import { Animated, useTheme } from "@peersyst/react-components";
import { BaseGridFiltersRoot, FiltersModal } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";
import FiltersContainer from "../FiltersContainer/FiltersContainer";

function BaseGridFilters<T extends PaginatedData, TagT>({ children }: BaseGridFiltersProps<T, TagT>): JSX.Element {
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

    return isTablet ? (
        <FiltersModal animation="from-bottom" open={showFilters} onClose={handleHide}>
            <FiltersContainer>{children}</FiltersContainer>
        </FiltersModal>
    ) : (
        <Animated.Slide in direction="right">
            <BaseGridFiltersRoot>
                <FiltersContainer>{children}</FiltersContainer>
            </BaseGridFiltersRoot>
        </Animated.Slide>
    );
}

export default BaseGridFilters;
