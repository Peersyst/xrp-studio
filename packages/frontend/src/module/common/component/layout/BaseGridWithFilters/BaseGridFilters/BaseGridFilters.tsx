import { Animated, useTheme } from "@peersyst/react-components";
import { BaseGridFiltersRoot, FiltersModal } from "./BaseGridFilters.styles";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";
import FiltersContainer from "../FiltersContainer/FiltersContainer";
import Filters from "module/common/component/input/Filters/Filters";
import { FiltersProvider } from "module/common/component/input/Filters/FiltersContext";

function BaseGridFilters<F>({ filtersContext, children }: BaseGridFiltersProps<F>): JSX.Element {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);

    const handleHide = () => {
        if (isTablet) setShowFilters(false);
    };

    return (
        <FiltersProvider value={filtersContext}>
            <FiltersModal animation="from-bottom" open={isTablet && showFilters} onClose={handleHide}>
                <FiltersContainer>
                    <Filters>{children}</Filters>
                </FiltersContainer>
            </FiltersModal>
            <Animated.Slide in={!isTablet && showFilters} direction="right" duration={500}>
                <BaseGridFiltersRoot>
                    <FiltersContainer>
                        <Filters>{children}</Filters>
                    </FiltersContainer>
                </BaseGridFiltersRoot>
            </Animated.Slide>
        </FiltersProvider>
    );
}

export default BaseGridFilters;
