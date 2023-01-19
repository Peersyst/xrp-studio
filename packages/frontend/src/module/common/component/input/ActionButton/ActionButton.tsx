import { ActionButtonProps } from "module/common/component/input/ActionButton/ActionButton.types";
import { Popover, Typography } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import { useActionButtonGroup } from "module/common/component/input/ActionButtonGroup/ActionButtonGroup.context";
import { useEffect } from "react";

function ActionButton<T extends string = string>({
    label,
    action,
    popover,
    loading,
    disabled: disabledProp,
    ...buttonProps
}: ActionButtonProps<T>): JSX.Element {
    const { loadingAction, setLoadingAction } = useActionButtonGroup();

    useEffect(() => {
        if (loadingAction === action && !loading) setLoadingAction(undefined);
        else if (loadingAction !== action && loading) setLoadingAction(action);
    }, [loading]);

    const disabled = (loadingAction !== undefined && loadingAction !== action) || disabledProp;

    return (
        <Popover visible={popover?.enabled ? undefined : false} arrow position="top">
            <Popover.Content>
                <span>
                    <Button size="lg" type="submit" action={action} loading={loading} disabled={disabled} {...buttonProps}>
                        {label}
                    </Button>
                </span>
            </Popover.Content>
            <Popover.Popper>
                <Typography variant="body2" css={{ padding: "0.75rem" }}>
                    {popover?.message}
                </Typography>
            </Popover.Popper>
        </Popover>
    );
}

export default ActionButton;
