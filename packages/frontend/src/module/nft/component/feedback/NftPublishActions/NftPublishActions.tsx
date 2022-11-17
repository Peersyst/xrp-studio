import { Fragment, useEffect, useState } from "react";
import NftPublishActionStep from "module/nft/component/feedback/NftPublishActions/NftPublishActionStep/NftPublishActionStep";
import { NftPublishActionsProps } from "module/nft/component/feedback/NftPublishActions/NftPublishActions.types";
import { Col, Typography } from "@peersyst/react-components";

const NftPublishActions = ({ steps }: NftPublishActionsProps): JSX.Element => {
    const [currentStep, setCurrentStep] = useState(0);
    const [, setSuccess] = useState(false);
    //const [error, setError] = useState(false);

    useEffect(() => {
        setTimeout(onStepSuccess, 2000);
    }, [currentStep]);

    const onStepSuccess = () => {
        if (currentStep === steps.length - 1) {
            setSuccess(true);
        }
        setCurrentStep(currentStep + 1);
    };

    return (
        <Col gap="2rem" flex={1} justifyContent="center">
            <Typography variant="h6" fontWeight={700}>
                Creation steps:
            </Typography>
            <Col gap="2rem" flex={1} justifyContent="center">
                {steps.map((step, i) => (
                    <Fragment key={i}>
                        <NftPublishActionStep stepNumber={i + 1} step={step} active={currentStep === i} onSuccess={onStepSuccess} />
                    </Fragment>
                ))}
            </Col>
        </Col>
    );
};

export default NftPublishActions;
