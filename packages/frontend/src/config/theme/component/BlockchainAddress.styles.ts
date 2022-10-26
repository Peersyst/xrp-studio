import { css } from "styled-components";

export const BlockchainAddressStyles = css(({ theme }) => ({
    [".BlockchainAddress"]: {
        color: theme.palette.black["60"],
        fontWeight: 500,
        borderRadius: 6,
        columnGap: "0.5rem",
    },
}));
