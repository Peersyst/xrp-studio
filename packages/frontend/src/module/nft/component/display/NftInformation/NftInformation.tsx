import useTranslate from "module/common/hook/useTranslate";
import { Col, Typography } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useRecoilValue } from "recoil";
import publishNftState from "module/nft/state/PublishNftState";
import InformationField from "module/common/component/display/InformationField/InformationField";
import { NftInformationFieldProps } from "./NftInformation.types";
import { NftFlagsRequest } from "module/api/service";
import usePublishNftSteps from "module/nft/hook/usePublishNftSteps";
import NftPublishModal from "module/nft/component/feedback/NftPublishModal/NftPublishModal";
import { useContext, useEffect } from "react";
import { NftPublishModalContext } from "module/nft/component/feedback/NftPublishModal/NftPublishModalContext";

const NftInformation = (): JSX.Element => {
    const translate = useTranslate();
    const {
        data: { issuer: issuer, transferFee: transferFee, flags: flags, metadata: metadata },
        collection: collection,
    } = useRecoilValue(publishNftState);
    const modalContext = useContext(NftPublishModalContext);

    const flagsKeys = Object.keys(flags || {}) as (keyof NftFlagsRequest)[];
    const flagsValues = Object.values(flags || {});
    flagsValues.length;
    const hasFlags = flagsValues.find((flag) => flag);
    const isDataProvided = hasFlags || issuer || transferFee !== undefined || metadata?.name || collection;

    const { handleClick: handlePublish } = usePublishNftSteps(NftPublishModal.id);

    useEffect(() => {
        modalContext?.setState({
            handleClick: handlePublish,
            buttonLabel: capitalize(translate("confirm")),
            buttonDisabled: modalContext?.state.buttonDisabled,
            tab: 0,
            closable: true,
            modalId: modalContext?.state.modalId,
        });
    }, []);

    const informationFields: NftInformationFieldProps[] = [
        {
            title: capitalize(translate("name")),
            content: metadata?.name,
        },
        {
            title: translate("collection"),
            content: collection,
        },
        {
            title: translate("issuer"),
            content: issuer,
        },
        {
            title: translate("transferFee"),
            content: transferFee ? transferFee + "%" : undefined,
        },
    ];

    return (
        <>
            {isDataProvided ? (
                <Col flex={1} gap="1rem" justifyContent="flex-start">
                    {informationFields.map(
                        ({ content, title }) =>
                            content && (
                                <InformationField key={title} title={title}>
                                    {content}
                                </InformationField>
                            ),
                    )}
                    {hasFlags && (
                        <InformationField title={capitalize(translate("flags"))}>
                            <Col gap={8}>
                                {flagsKeys.map((key) => {
                                    return (
                                        !flags ||
                                        (flags[key] && (
                                            <Typography key={key} variant="body2">
                                                {translate(key)}
                                            </Typography>
                                        ))
                                    );
                                })}
                            </Col>
                        </InformationField>
                    )}
                </Col>
            ) : (
                <Col flex={1} justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                    <Typography variant="h6" fontWeight={700}>
                        {translate("noDataProvided")}
                    </Typography>
                </Col>
            )}
        </>
    );
};

export default NftInformation;
