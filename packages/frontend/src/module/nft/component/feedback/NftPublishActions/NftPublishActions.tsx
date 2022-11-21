import { Fragment, useEffect, useState } from "react";
import NftPublishActionStep from "module/nft/component/feedback/NftPublishActions/NftPublishActionStep/NftPublishActionStep";
import { NftPublishActionsProps } from "module/nft/component/feedback/NftPublishActions/NftPublishActions.types";
import { Col, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import useNftPublishModalState from "module/nft/hook/useNftPublishModalState";

const NftPublishActions = ({ steps }: NftPublishActionsProps): JSX.Element => {
    const translate = useTranslate();
    const [currentStep, setCurrentStep] = useState(0);
    const [, setNftPublishModalState] = useNftPublishModalState();
    //const [error, setError] = useState(false);

    useEffect(() => {
        setTimeout(onStepSuccess, 2000);
    }, [currentStep]);

    const onStepSuccess = () => {
        if (currentStep === steps.length - 1) {
            setTimeout(
                () =>
                    setNftPublishModalState({
                        buttonLabel: capitalize(translate("finish")),
                        buttonDisabled: false,
                        closable: true,
                        tab: 2,
                    }),
                500,
            );
        }
        setCurrentStep(currentStep + 1);
    };

    return (
        <Col gap="2rem" flex={1} justifyContent="center">
            <Typography variant="h6" fontWeight={700}>
                Creation steps:
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
