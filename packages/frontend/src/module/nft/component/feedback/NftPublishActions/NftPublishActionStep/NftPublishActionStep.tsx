import { ErrorIcon, Expandable, Loader, Row, SuccessIcon, Typography } from "@peersyst/react-components";
import { NftPublishActionsStepsProps } from "module/nft/component/feedback/NftPublishActions/NftPublishActions.types";
import { useEffect, useState } from "react";

const NftPublishActionStep = ({
    step: { title, description, execution },
    active: active,
    stepNumber: stepNumber,
}: NftPublishActionsStepsProps): JSX.Element => {
    const [state, setState] = useState({ error: false, finished: false });

    useEffect(() => {
        if (!active || state.finished) return;
        execution()
            .then(() => {
                setState({ error: false, finished: true });
            })
            .catch((e) => {
                setState({ error: true, finished: false });
            });
    }, [active]);

    return (
        <Expandable open={active}>
            <Expandable.Display ExpandComponent={false}>
                <Row gap={10}>
                    <Row>
                        {!active && !state.error && !state.finished && (
                            <Typography variant="body1" fontWeight={600}>
                                {stepNumber}
                            </Typography>
                        )}
                        {active && !state.error && <Loader />}
                        {active && state.error && <ErrorIcon />}
                        {!active && state.finished && <SuccessIcon />}
                    </Row>
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

export default NftPublishActionStep;
