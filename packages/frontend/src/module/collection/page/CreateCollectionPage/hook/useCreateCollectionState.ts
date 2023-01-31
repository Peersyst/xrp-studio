import { CreateCollectionNftRequest, MetadataAttributeDto } from "module/api/service";
import { CollectionCreationNft } from "module/collection/types";
import createCollectionState, { CreateCollectionState } from "module/collection/page/CreateCollectionPage/state/CreateCollectionState";
import { useRecoilState } from "recoil";
import Color from "color";

export interface UseCreateCollectionReturn {
    state: CreateCollectionState;
    setHeader: (header: string | undefined) => void;
    setImage: (image: string | undefined) => void;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setTransferFee: (transferFee: string) => void;
    setExternalUrl: (externalUrl: string) => void;
    setBackgroundColor: (backgroundColor: Color) => void;
    setBurnable: (burnable: boolean) => void;
    setOnlyXRP: (onlyXRP: boolean) => void;
    setTransferable: (transferable: boolean) => void;
    setAttributes: (attributes: MetadataAttributeDto[]) => void;
    addNfts: (nfts: CollectionCreationNft[]) => void;
    removeNft: (id: number) => void;
    setNft: (index: number, data: CreateCollectionNftRequest) => void;
}

export default function (): UseCreateCollectionReturn {
    const [state, setState] = useRecoilState(createCollectionState);

    function setPartialState(partialState: Partial<CreateCollectionState>): void {
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

    function setTransferFee(transferFee: string): void {
        return setPartialState({ transferFee });
    }

    function setExternalUrl(externalUrl: string): void {
        return setPartialState({ externalUrl });
    }

    function setBackgroundColor(backgroundColor: Color): void {
        return setPartialState({ backgroundColor });
    }

    function setBurnable(burnable: boolean): void {
        return setPartialState({ burnable });
    }

    function setOnlyXRP(onlyXRP: boolean): void {
        return setPartialState({ onlyXRP });
    }

    function setTransferable(transferable: boolean): void {
        return setPartialState({ transferable });
    }

    function setAttributes(attributes: MetadataAttributeDto[]): void {
        return setPartialState({ attributes });
    }

    function addNfts(nfts: CollectionCreationNft[]): void {
        setState(({ nfts: oldNfs, ...rest }) => ({ ...rest, nfts: [...oldNfs, ...nfts] }));
    }

    function removeNft(id: number): void {
        setState(({ nfts: oldNfs, ...rest }) => ({ ...rest, nfts: oldNfs.filter((nft) => nft.id !== id) }));
    }

    function setNft(index: number, data: CreateCollectionNftRequest): void {
        const nfts = [...state.nfts];
        nfts[index] = { ...data, id: index };
        setPartialState({
            nfts,
        });
    }

    return {
        state,
        setHeader,
        setImage,
        setName,
        setDescription,
        setTransferFee,
        setBackgroundColor,
        setExternalUrl,
        setBurnable,
        setOnlyXRP,
        setTransferable,
        setAttributes,
        addNfts,
        removeNft,
        setNft,
    };
}
