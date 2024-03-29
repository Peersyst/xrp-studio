import { NftDisplayProps } from "./NftDisplay.types";
import { config } from "config";
import { Image, useModal } from "@peersyst/react-components";
import { NftDisplayRoot, PhygitalQrButton } from "./NfyDisplay.styles";
import { PhygitalIcon } from "icons";
import PhygitalQrModal from "../PhygitalQrModal/PhygitalQrModal";
import clsx from "clsx";

const NftDisplay = ({
    image = "",
    fallback = config.nftDefaultImageUrl,
    phygitalPublicKey,
    className,
    ...rest
}: NftDisplayProps): JSX.Element => {
    const { showModal } = useModal();

    const handlePhygitalQrClick = () => {
        showModal(PhygitalQrModal, { publicKey: phygitalPublicKey! });
    };

    return (
        <NftDisplayRoot {...rest} className={clsx("nft-display", className)}>
            <Image src={image} alt="nft-image" fallback={fallback} />
            {!!phygitalPublicKey && (
                <PhygitalQrButton onClick={handlePhygitalQrClick}>
                    <PhygitalIcon css={{ fontSize: "2.25rem" }} />
                </PhygitalQrButton>
            )}
        </NftDisplayRoot>
    );
};

export default NftDisplay;
