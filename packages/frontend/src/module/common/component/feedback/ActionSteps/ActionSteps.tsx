import { useState } from "react";
import { Col, Divider, Typography } from "@peersyst/react-components";
import { ActionStepsProps } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionStep from "module/common/component/feedback/ActionSteps/ActionStep/ActionStep";

const ActionSteps = ({ title, steps, onSuccess }: ActionStepsProps): JSX.Element => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleStepSuccess = () => {
        if (currentStep === steps.length - 1) onSuccess();
        setCurrentStep(currentStep + 1);
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
            <Col gap="1.5rem" flex={1} justifyContent="center" css={{ width: "100%" }}>
                {steps.map((step, i) => (
                    <ActionStep key={i} stepNumber={i + 1} step={step} active={currentStep === i} onSuccess={handleStepSuccess} />
                ))}
            </Col>
        </Col>
    );
};

export default ActionSteps;
