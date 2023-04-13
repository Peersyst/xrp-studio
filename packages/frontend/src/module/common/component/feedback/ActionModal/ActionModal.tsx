import { ButtonVariant, Col, ColProps, createModal, Row, RowProps } from "@peersyst/react-components";
import { ActionModalProps, Action, ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import Modal from "module/common/component/feedback/Modal/Modal";
import { useState } from "react";
import Button from "module/common/component/input/Button/Button";
import { TFuncKey } from "react-i18next";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import { TabsCard } from "module/common/component/feedback/ActionModal/ActionModal.styles";

const actionVariants: Record<Exclude<Action, ActionFn>, ButtonVariant> = {
    back: "secondary",
    close: "secondary",
    next: "primary",
};

const actionLabels: Record<Exclude<Action, ActionFn>, TFuncKey> = {
    back: "back",
    close: "close",
    next: "next",
};

const ActionModal = createModal<ActionModalProps>(
    ({ direction = "row", children: { cover, tabs, footer }, size = "lg", closable, close, ...rest }) => {
        const translate = useTranslate();
        const [tab, setTab] = useState(0);

        const modalActions = {
            next: tab === tabs.length - 1 ? close : () => setTab(tab + 1),
            back: tab < 1 ? close : () => setTab(tab - 1),
            close,
        };

        const { content, actions } = tabs[tab];

        const [Body, bodyProps] =
            direction === "row"
                ? [
                      Row,
                      {
                          gap: "1rem",
                          flex: 1,
                          justifyContent: "stretch",
                          breakpoint: { width: "nftPage", alignItems: "stretch", justifyContent: "center", gap: "1.5rem" },
                      } as RowProps,
                  ]
                : [Col, { gap: "1rem", flex: 1 } as ColProps];

        return (
            <Modal size={size} closable={closable} {...rest}>
                <Col flex={1} gap="1.5rem">
                    <Body {...bodyProps}>
                        <Col flex={1}>{cover}</Col>
                        <TabsCard flex={1} as={Col}>
                            {content}
                        </TabsCard>
                    </Body>
                    <Row flex={1} gap="1.5rem" justifyContent="space-between" alignItems="center" wrap wrapGap="1rem">
                        {footer}
                        <Row flex={1} gap="1rem" justifyContent="flex-start" reverse>
                            {actions.map(({ action: actionProp, label: labelProp, variant: variantProp, disabled, loading }, key) => {
                                const { action, label, variant } =
                                    typeof actionProp === "function"
                                        ? {
                                              action: () => actionProp(modalActions),
                                              label: translate("confirm"),
                                              variant: "primary" as ButtonVariant,
                                          }
                                        : {
                                              action: modalActions[actionProp],
                                              label: translate(actionLabels[actionProp]),
                                              variant: actionVariants[actionProp],
                                          };

                                return (
                                    <Button
                                        key={key}
                                        onClick={action}
                                        disabled={disabled}
                                        loading={loading}
                                        variant={variantProp || variant}
                                    >
                                        {capitalize(labelProp || label)}
                                    </Button>
                                );
                            })}
                        </Row>
                    </Row>
                </Col>
            </Modal>
        );
    },
);

export default ActionModal;
