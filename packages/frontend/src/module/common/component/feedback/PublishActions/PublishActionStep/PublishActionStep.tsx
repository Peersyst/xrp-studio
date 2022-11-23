import { Expandable, Loader, Row, Typography } from "@peersyst/react-components";
import { NftPublishActionsStepsProps } from "module/common/component/feedback/PublishActions/PublishActions.types";
import { useEffect, useState } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "icons";

const PublishActionStep = ({
    step: { title, description, execution },
    active: active,
    stepNumber: stepNumber,
    onSuccess: onSuccess,
}: NftPublishActionsStepsProps): JSX.Element => {
    const [state, setState] = useState({ error: false, finished: false });

    useEffect(() => {
        if (!active || state.finished) return;
        execution()
            .then(() => {
                setState({ error: false, finished: true });
                onSuccess();
            })
            .catch(() => {
                setState({ error: true, finished: false });
            });
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

export default PublishActionStep;
