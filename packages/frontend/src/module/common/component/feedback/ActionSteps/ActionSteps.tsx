import { useEffect, useState } from "react";
import { Col, Divider, Typography } from "@peersyst/react-components";
import { ActionStepsProps } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionStep from "module/common/component/feedback/ActionSteps/ActionStep/ActionStep";

const ActionSteps = ({ title, steps, onStart, onEnd, onSuccess, onError }: ActionStepsProps): JSX.Element => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        onStart?.();
    }, []);

    const handleStepSuccess = () => {
        if (currentStep === steps.length - 1) {
            onSuccess?.();
            onEnd?.();
        }
        setCurrentStep(currentStep + 1);
    };

    const handleError = (e: unknown) => {
        onError?.(e);
        onEnd?.();
    };

    return (
        <Col flex={1}>
            {title && (
                <Col gap="1rem">
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Divider />
                </Col>
            )}
            <Col gap="1.5rem" flex={1} css={{ width: "100%" }}>
                {steps.map((step, i) => (
                    <ActionStep
                        key={i}
                        stepNumber={i + 1}
                        step={step}
                        active={currentStep === i}
                        onSuccess={handleStepSuccess}
                        onError={handleError}
                    />
                ))}
            </Col>
        </Col>
    );
};

export default ActionSteps;
