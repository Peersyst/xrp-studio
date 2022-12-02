import { Expandable, Loader, Row, Typography } from "@peersyst/react-components";
import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "icons";
import { ActionStepProps } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import { handleErrorMessage } from "../../../../../../query/handleErrorMessage";
import useTranslate from "module/common/hook/useTranslate";

const ActionStep = ({ step: { title, description, execution }, active, stepNumber, onSuccess, onError }: ActionStepProps): JSX.Element => {
    const translateError = useTranslate("error");

    const [state, setState] = useState({ error: false, finished: false });
    const [errorMsg, setErrorMsg] = useState<string>();

    useEffect(() => {
        if (!active || state.finished) return;
        (async function () {
            try {
                const executionPromise = Promise.resolve(execution?.());
                await executionPromise;
                setState({ error: false, finished: true });
                onSuccess();
            } catch (e) {
                setState({ error: true, finished: false });
                setErrorMsg(handleErrorMessage(e, translateError).message);
                onError(e);
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
                    {!active && state.finished && <CheckCircleIcon color={"green.100"} />}
                    <Typography variant="body1" fontWeight={600}>
                        {title}
                    </Typography>
                </Row>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Typography variant="body2" color={"black.40"}>
                        {state.error ? errorMsg : description}
                    </Typography>
                </Expandable.Content>
            </Expandable.Body>
        </Expandable>
    );
};

export default ActionStep;
