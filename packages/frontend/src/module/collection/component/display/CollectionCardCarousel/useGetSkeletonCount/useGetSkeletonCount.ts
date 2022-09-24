import { useTheme } from "@peersyst/react-components";
import { useMediaQuery } from "@peersyst/react-hooks";

export const useGetSkeletonCount = (): number => {
    const {
        breakpoints: { values },
    } = useTheme();
    const isMd = useMediaQuery(`(max-width: ${values.md}px)`);
    const isMini = useMediaQuery(`(max-width: ${values.mini}px)`);

    if (isMini) return 1;
    if (isMd) return 2;
    return 3;
};
