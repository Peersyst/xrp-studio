import { Fragment, useState } from "react";
import NftPublishActionStep from "module/nft/component/feedback/NftPublishActions/NftPublishActionStep/NftPublishActionStep";
import { NftPublishActionsProps } from "module/nft/component/feedback/NftPublishActions/NftPublishActions.types";
import { Col, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

const NftPublishActions = ({ steps, onSuccess }: NftPublishActionsProps): JSX.Element => {
    const translate = useTranslate();
    const [currentStep, setCurrentStep] = useState(0);

    const onStepSuccess = () => {
        if (currentStep === steps.length - 1) {
            onSuccess();
        }
        setCurrentStep(currentStep + 1);
    };

    return (
        <Col gap="2rem" flex={1} justifyContent="center">
            <Typography variant="h6" fontWeight={700}>
                {translate("creationSteps")}:
            </Typography>
            <Col gap="2rem" flex={1} justifyContent="center" alignItems="center" style={{ width: "100%" }}>
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
