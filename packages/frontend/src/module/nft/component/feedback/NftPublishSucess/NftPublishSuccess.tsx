import { Col, Typography, useModal } from "@peersyst/react-components";
import InformationField from "module/common/component/display/InformationField/InformationField";
import useTranslate from "module/common/hook/useTranslate";
import { useContext, useEffect } from "react";
import { NftPublishModalContext } from "module/nft/component/feedback/NftPublishModal/NftPublishModalContext";
import { capitalize } from "@peersyst/react-utils";

const NftPublishSuccess = (): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const modalContext = useContext(NftPublishModalContext);

    useEffect(() => {
        modalContext?.setState({
            closable: true,
            tab: 2,
            buttonLabel: capitalize(translate("finish")),
            handleClick: async () => {
                hideModal(modalContext!.state.modalId!);
            },
        });
    }, []);
    return (
        <Col gap="2rem">
            <Typography variant="h6" fontWeight={700}>
                {translate("successTitle")}
            </Typography>
            <Col gap="1rem">
                <InformationField title={translate("hashTransactionCreation")}>
                    <Typography variant="body2">mock_transactionHash</Typography>
                </InformationField>
                <InformationField title={translate("tokenId")}>
                    <Typography variant="body2">mock_id</Typography>
                </InformationField>
                <InformationField title={translate("transferFeeCost")}>
                    <Typography variant="body2">mock_transactionFee</Typography>
                </InformationField>
            </Col>
        </Col>
    );
};

export default NftPublishSuccess;
