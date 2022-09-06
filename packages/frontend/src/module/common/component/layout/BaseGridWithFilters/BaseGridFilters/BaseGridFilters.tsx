import { Animated, useTheme } from "@peersyst/react-components";
import { BaseGridFiltersRoot, FiltersModal } from "./BaseGridFilters.styles";
import { PaginatedData } from "query-utils";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";
import FiltersContainer from "./FiltersContainer";

function BaseGridFilters<T extends PaginatedData>({ children }: BaseGridFiltersProps<T>): JSX.Element {
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
                        <FiltersContainer>{children}</FiltersContainer>
                    </BaseGridFiltersRoot>
                </Animated.Slide>
            )}
            <FiltersModal animation="from-bottom" renderAtRoot={true} open={showFilters && isTablet} onClose={handleHide}>
                <FiltersContainer>{children}</FiltersContainer>
            </FiltersModal>
        </>
    );
}

export default BaseGridFilters;
