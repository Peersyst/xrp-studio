import { createTheme } from "@peersyst/react-components";
import { translate } from "locale";

export const theme = createTheme({
    translate: translate,
    palette: {
        mode: "dark",
        text: "#FFFFFF",
        background: "#0A0A0A",
        primary: "#0047FF",
        disabled: "#5A5A5A",
        status: {
            error: "#E84A74",
            warning: "#FE7A01",
            success: "#68DB65",
            info: "#41D2C1",
        },
    },
    breakpoints: {
        values: {
            nftsGrid: {
                md: 1480,
                sm: 1250,
                xs: 920,
                xxs: 690,
                mobile: 650,
                mini: 460,
            },
            nftsGridWithFilters: {
                md: 1860,
                sm: 1580,
                xs: 1360,
                xxs: 1060,
                mini: 860,
            },
            detailsPage: 1250,
        },
    },
});
