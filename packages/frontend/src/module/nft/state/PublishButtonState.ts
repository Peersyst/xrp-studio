import { atom } from "recoil";

export interface PublishButtonState {
    disabled: boolean;
    label: string;
}

const publishButtonState = atom<PublishButtonState>({
    key: "publish-button",
    default: { disabled: false, label: "" },
});

export default publishButtonState;
