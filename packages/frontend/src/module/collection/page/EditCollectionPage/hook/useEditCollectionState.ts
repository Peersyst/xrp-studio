import { SetterOrUpdater, useRecoilState } from "recoil";
import editCollectionState, { EditCollectionState } from "module/collection/page/EditCollectionPage/state/EditCollectionState";

export interface UseEditCollectionStateReturn {
    state: EditCollectionState;
    setState: SetterOrUpdater<EditCollectionState>;
    setHeader: (header: string | undefined) => void;
    setImage: (image: string | undefined) => void;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
}

export default function (): UseEditCollectionStateReturn {
    const [state, setState] = useRecoilState(editCollectionState);

    function setPartialState(partialState: Partial<EditCollectionState>): void {
        return setState((oldState) => ({ ...oldState, ...partialState }));
    }

    function setHeader(header: string | undefined): void {
        return setPartialState({ header });
    }

    function setImage(image: string | undefined): void {
        return setPartialState({ image });
    }

    function setName(name: string): void {
        return setPartialState({ name });
    }

    function setDescription(description: string): void {
        return setPartialState({ description });
    }

    return {
        state,
        setState,
        setHeader,
        setImage,
        setName,
        setDescription,
    };
}
