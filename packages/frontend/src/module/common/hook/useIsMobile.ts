import { useTheme } from "@peersyst/react-components";
import { useMediaQuery } from "@peersyst/react-hooks";

export default function (): boolean {
    const {
        breakpoints: {
            values: { mobile },
        },
    } = useTheme();

    return useMediaQuery(`(max-width: ${mobile}px)`);
}
