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
                xl: 3000,
                lg: 2000,
                md: 1400,
                sm: 1000,
                xs: 767,
                xxs: 500,
            },
        },
    },
});

export default theme;
