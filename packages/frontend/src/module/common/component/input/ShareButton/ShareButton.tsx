import SocialButton from "../../input/SocialButton/SocialButton";
import { useShare } from "./hook/useShare";
import { useSocialShare } from "./hook/useSocialShare";
import { ShareButtonProps } from "./ShareButton.types";

export const ShareButton = ({ shareData, networks = [] }: ShareButtonProps): JSX.Element => {
    const { share } = useShare(shareData);
    const { optionsShare } = useSocialShare({ networks, shareData });

    return <SocialButton icon="share" onClick={share} showOn="click" optionsShare={optionsShare} />;
};

export default ShareButton;
