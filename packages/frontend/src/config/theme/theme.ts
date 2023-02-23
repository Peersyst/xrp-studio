import { createTheme } from "@peersyst/react-components";
import { CopyIcon } from "icons";
import typography from "./typography";

// Common theme fields
const theme = createTheme({
    icons: { copy: CopyIcon },
    borderRadius: "0.375rem",
    borderRadiusMd: "0.5rem",
    borderRadiusLg: "0.75rem",
    zIndex: {
        filters: 2,
    },
    typography: typography,
    breakpoints: {
        values: {
            filters: 1000,
            nftsGrid: {
                sm: 1000,
                xs: 767,
                xxs: 500,
            },
            nftPage: 900,
            collectionsGrid: {
                xs: 1345,
                xxs: 800,
            },
            createCollectionPage: 950,
            createCollectionNftGrid: 550,
            dropLandingPage: 1000,
        },
    },
});

export default theme;
