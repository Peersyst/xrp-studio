import { createTheme } from "@peersyst/react-components";
import { CopyIcon } from "icons";

// Common theme fields
const theme = createTheme({
    icons: { copy: CopyIcon },
    borderRadius: "0.375rem",
    borderRadiusMd: "0.5rem",
    borderRadiusLg: "0.75rem",
    zIndex: {
        filters: 2,
    },
    breakpoints: {
        values: {
            nftsGrid: {
                xxxl: 14000,
                xxl: 4000,
                xl: 3000,
                lg: 2000,
                md: 1400,
                tablet: 1000,
                mobile: 767,
                mobileSm: 500,
            },
        },
    },
});

export default theme;
