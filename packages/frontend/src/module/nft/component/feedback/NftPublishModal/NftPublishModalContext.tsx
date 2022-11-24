import { createContext, Dispatch, SetStateAction } from "react";

export interface NftPublishModalState {
    handleClick: () => Promise<void>;
    buttonDisabled: boolean;
    buttonLabel: string;
    closable: boolean;
    tab: 0 | 1 | 2;
    modalId: string;
}

export interface NftPublishModalContext {
    state: Partial<NftPublishModalState>;
    setState: Dispatch<SetStateAction<Partial<NftPublishModalState>>>;
}

export const NftPublishModalContext = createContext<NftPublishModalContext | null>(null);
