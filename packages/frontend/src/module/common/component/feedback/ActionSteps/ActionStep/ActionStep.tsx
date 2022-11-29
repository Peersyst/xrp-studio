import { Expandable, Loader, Row, Typography } from "@peersyst/react-components";
import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "icons";
import { ActionStepProps } from "module/common/component/feedback/ActionSteps/ActionSteps.types";

const ActionStep = ({
    step: { title, description, execution },
    active: active,
    stepNumber: stepNumber,
    onSuccess: onSuccess,
    onError: onError,
}: ActionStepProps): JSX.Element => {
    const [state, setState] = useState({ error: false, finished: false });

    useEffect(() => {
        if (!active || state.finished) return;
        (async function () {
            try {
                const executionPromise = Promise.resolve(execution?.());
                await executionPromise;
                setState({ error: false, finished: true });
                onSuccess();
            } catch (_e) {
                setState({ error: true, finished: false });
                onError(_e);
            }
        })();
    }, [active]);

    return (
        <Expandable open={active}>
            <Expandable.Display ExpandComponent={false}>
                <Row gap={10} alignItems="center">
                    {!active && !state.error && !state.finished && (
                        <Typography variant="body1" fontWeight={600}>
                            {stepNumber}
                        </Typography>
                    )}
                    {active && !state.error && <Loader />}
                    {active && state.error && <AlertCircleIcon />}
                    {!active && state.finished && <CheckCircleIcon />}
                    <Typography variant="body1" fontWeight={600}>
                        {title}
                    </Typography>
                </Row>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Typography variant="body2" color={"black.40"}>
                        {description}
                    </Typography>
                </Expandable.Content>
            </Expandable.Body>
        </Expandable>
    );
};

export default ActionStep;
