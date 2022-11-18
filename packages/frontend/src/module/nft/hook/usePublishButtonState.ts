import publishNftState, { PublishButtonState } from "module/nft/state/PublishButtonState";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";

export default function (): [PublishButtonState, Dispatch<PublishButtonState>] {
    const [state, setState] = useRecoilState(publishNftState);
    return [state, (newState) => setState(newState)];
}
