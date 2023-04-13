import { TabPanel, Tabs } from "@peersyst/react-components";
import clsx from "clsx";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { TabsModalProps } from "./TabsModal.types";
import { TabsModalProvider } from "./context/TabsModalContext";
import { useControlled } from "@peersyst/react-hooks";

function TabsModal<T>({
    className,
    tabs,
    title,
    open: openProp,
    onClose,
    defaultOpen,
    defaultState,
    defaultTab = 0,
    ...rest
}: TabsModalProps<T>): JSX.Element {
    const [open, setOpen] = useControlled(defaultOpen, openProp, openProp ? onClose : undefined);
    const [state, setState] = useState<typeof defaultState>(defaultState);
    const [activeTab, setActiveTab] = useState(defaultTab);

    function goToNextTab() {
        setActiveTab((currentTab) => currentTab + 1);
    }

    function handleCloseModal() {
        setOpen(false);
        onClose?.();
    }

    return (
        <Modal
            className={clsx("tabs-modal", className)}
            title={tabs[activeTab]?.title || title!}
            open={open}
            onClose={handleCloseModal}
            {...rest}
        >
            <Tabs index={activeTab} onIndexChange={setActiveTab}>
                <TabsModalProvider value={{ goToNextTab, closeModal: handleCloseModal, state, setState }}>
                    {tabs.map(({ content }, index) => {
                        return (
                            <TabPanel key={index} index={index}>
                                {content}
                            </TabPanel>
                        );
                    })}
                </TabsModalProvider>
            </Tabs>
        </Modal>
    );
}

export default TabsModal;
