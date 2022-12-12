import { Animated, useTheme } from "@peersyst/react-components";
import { BaseGridFiltersRoot, FiltersModal } from "./BaseGridFilters.styles";
import { BaseGridFiltersProps } from "./BaseGridFilters.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import { useMediaQuery } from "@peersyst/react-hooks";
import FiltersContainer from "../FiltersContainer/FiltersContainer";
import Filters from "module/common/component/input/Filters/Filters";

function BaseGridFilters({ children, ...rest }: BaseGridFiltersProps): JSX.Element {
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
    const content = (
        <FiltersContainer>
            <Filters>{children}</Filters>
        </FiltersContainer>
    );

    return (
        <>
            <FiltersModal animation="from-bottom" open={isTablet && showFilters} onClose={handleHide}>
                {content}
            </FiltersModal>
            <Animated.Slide in={!isTablet && showFilters} direction="right" duration={500}>
                <BaseGridFiltersRoot {...rest}>{content}</BaseGridFiltersRoot>
            </Animated.Slide>
        </>
    );
}

export default BaseGridFilters;
