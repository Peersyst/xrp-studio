import { Dispatch } from "react";
import { useRecoilState } from "recoil";
import dropCreationState, { DropCreationState } from "../state/DropCreationState";

export default function (): [DropCreationState, Dispatch<Partial<DropCreationState>>] {
    const [state, setState] = useRecoilState(dropCreationState);
    return [state, (newState: Partial<DropCreationState>) => setState((oldState) => ({ ...oldState, ...newState }))];
}
