import { DropLaunchInformationDialogProps } from "module/drop/component/feedback/DropLaunchInformationDialog/DropLaunchInformationDialog.types";
import useDropCost from "module/drop/hook/useDropCost";
import { Col, Dialog, Typography, useConfig, useModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { dropsToXrp } from "xrpl";
import DropLaunchModal from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal";
import { useMemo } from "react";

const DropLaunchInformationDialog = ({ collection, request, open, onClose, ...rest }: DropLaunchInformationDialogProps): JSX.Element => {
    const dropNftMintCost = useConfig("dropNftMintCost");

    const translate = useTranslate();
    const { showModal } = useModal();

    const items = useMemo(() => collection?.nfts?.length || 0, [collection]);
    const cost = useDropCost(items);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            title={translate("launchDropInformation")}
            content={
                <Col gap="1rem">
                    <Typography variant="body1" light css={{ lineHeight: "1.5rem" }}>
                        {translate("launchDropInformationText")}
                    </Typography>
                    <Typography variant="body1" light css={{ lineHeight: "1.5rem" }}>
                        {translate("launchDropInformationCost", {
                            dropNftMintCost: dropsToXrp(dropNftMintCost),
                            items,
                            cost,
                        })}
                    </Typography>
                </Col>
            }
            buttons={[
                {
                    text: translate("decline"),
                    type: "destructive",
                    action: onClose,
                },
                {
                    text: translate("accept"),
                    action: () => {
                        if (request && collection)
                            showModal(DropLaunchModal, {
                                request,
                                collection: collection,
                            });
                        else {
                            // eslint-disable-next-line no-console
                            console.warn(
                                `[DropLaunchInformationDialog]: ${
                                    !request ? "request" : "collection"
                                } prop is undefined and open is true. This case should never happen.`,
                            );
                        }
                        onClose?.();
                    },
                },
            ]}
            {...rest}
        />
    );
};

export default DropLaunchInformationDialog;
