import { useRecoilState } from "recoil";
import publishNftState, { PublishNftState } from "module/nft/state/PublishNftState";
import { Dispatch } from "react";

export default function (): [PublishNftState, Dispatch<PublishNftState>] {
    const [state, setState] = useRecoilState(publishNftState);
    return [state, (newState: PublishNftState) => setState(newState)];
}
