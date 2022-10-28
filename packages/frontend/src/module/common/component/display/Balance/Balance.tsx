import { Loader, Typography } from "@peersyst/react-components";
import { BalanceProps } from "./Balance.types";
import { useFormatBalance } from "./hook/useFormatBalance";

const Balance = ({
    balance,
    options,
    units,
    unitsPosition = "right",
    action = "display",
    isLoading = false,
    ...typographyProps
}: BalanceProps): JSX.Element => {
    const formattedBalance = useFormatBalance();
    return isLoading ? (
        <Loader />
    ) : (
        <Typography singleLine {...typographyProps}>
            {formattedBalance(balance, {
                numberFormatOptions: { maximumFractionDigits: 2, ...options },
                units,
                unitsPosition,
                action,
            })}
        </Typography>
    );
};

export default Balance;
