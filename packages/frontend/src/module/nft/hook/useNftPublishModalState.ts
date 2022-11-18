import nftPublishModalState, { NftPublishModalState } from "module/nft/state/NftPublishModalState";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";

export default function (): [NftPublishModalState, Dispatch<Partial<NftPublishModalState>>] {
    const [state, setState] = useRecoilState(nftPublishModalState);
    return [state, (newState: Partial<NftPublishModalState>) => setState((oldState) => ({ ...oldState, ...newState }))];
}
