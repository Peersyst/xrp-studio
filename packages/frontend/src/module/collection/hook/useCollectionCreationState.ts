import collectionCreationState, { CollectionCreationState } from "module/collection/state/CollectionCreationState";
import { Dispatch } from "react";
import { useRecoilState } from "recoil";

export default function (): [CollectionCreationState, Dispatch<Partial<CollectionCreationState>>] {
    const [state, setState] = useRecoilState(collectionCreationState);
    return [state, (newState: Partial<CollectionCreationState>) => setState((oldState) => ({ ...oldState, ...newState }))];
}
