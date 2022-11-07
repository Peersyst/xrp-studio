import { css } from "styled-components";

export const BlockchainAddressStyles = css(({ theme }) => ({
    [".BlockchainAddress"]: {
        fontWeight: 500,
        columnGap: "0.5rem",
        a: {
            "&:hover": {
                textDecoration: "none",
                color: theme.palette.primary,
            },
        },
    },
}));
