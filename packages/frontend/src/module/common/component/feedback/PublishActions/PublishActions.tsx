import { useState } from "react";
import NftPublishActionStep from "module/common/component/feedback/PublishActions/PublishActionStep/PublishActionStep";
import { NftPublishActionsProps } from "module/common/component/feedback/PublishActions/PublishActions.types";
import { Col, Divider, Typography } from "@peersyst/react-components";

const PublishActions = ({ title, steps, onSuccess }: NftPublishActionsProps): JSX.Element => {
    const [currentStep, setCurrentStep] = useState(0);

    const onStepSuccess = () => {
        if (currentStep === steps.length - 1) {
            onSuccess();
        }
        setCurrentStep(currentStep + 1);
    };

    return (
        <Col gap="1rem" flex={1}>
            {title && (
                <Col gap="1rem">
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Divider />
                </Col>
            )}
            <Col gap="1.5rem" flex={1} justifyContent="center" style={{ width: "100%" }}>
                {steps.map((step, i) => (
                    <NftPublishActionStep key={i} stepNumber={i + 1} step={step} active={currentStep === i} onSuccess={onStepSuccess} />
                ))}
            </Col>
        </Col>
    );
};

export default PublishActions;
