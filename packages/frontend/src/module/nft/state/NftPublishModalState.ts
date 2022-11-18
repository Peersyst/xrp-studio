import { atom } from "recoil";

export interface NftPublishModalState {
    handleClick: () => Promise<void>;
    buttonDisabled: boolean;
    buttonLabel: string;
    closable: boolean;
    tab: 0 | 1 | 2;
}

const nftPublishModalState = atom<NftPublishModalState>({
    key: "publish-nft-modal",
    default: {
        buttonDisabled: false,
        buttonLabel: "",
        closable: true,
        handleClick: async () => {
            return;
        },

        tab: 0,
    },
});

export default nftPublishModalState;
