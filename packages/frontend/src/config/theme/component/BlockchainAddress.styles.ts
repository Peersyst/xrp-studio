import { css } from "styled-components";

export const BlockchainAddressStyles = css(({ theme }) => ({
    [".BlockchainAddress"]: {
        padding: "0.5rem 0.875rem",
        backgroundColor: theme.palette.black["85"],
        color: theme.palette.black["60"],
        fontWeight: 500,
        borderRadius: 6,
        columnGap: "0.5rem",
    },
}));
