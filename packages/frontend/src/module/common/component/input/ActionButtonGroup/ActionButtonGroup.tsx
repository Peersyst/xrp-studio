import { Row } from "@peersyst/react-components";
import { ActionButtonGroupProps } from "module/common/component/input/ActionButtonGroup/ActionButtonGroup.types";
import { useMemo, useState } from "react";
import ActionButton from "module/common/component/input/ActionButton/ActionButton";
import {
    ActionButtonGroupContextValue,
    ActionButtonGroupProvider,
} from "module/common/component/input/ActionButtonGroup/ActionButtonGroup.context";

function ActionButtonGroup<T extends string = string>({ actions }: ActionButtonGroupProps<T>): JSX.Element {
    const [loadingAction, setLoadingAction] = useState<T | undefined>();

    const actionButtonGroupContextValue: ActionButtonGroupContextValue<T> = useMemo(
        () => ({
            loadingAction,
            setLoadingAction,
        }),
        [loadingAction, setLoadingAction],
    );

    return (
        <ActionButtonGroupProvider value={actionButtonGroupContextValue}>
            <Row gap="1rem" wrap wrapGap="1.5rem">
                {actions.map(({ label, ...restActionButtonProps }, i) => (
                    <ActionButton key={label + i} label={label} {...restActionButtonProps} />
                ))}
            </Row>
        </ActionButtonGroupProvider>
    );
}

export default ActionButtonGroup;
