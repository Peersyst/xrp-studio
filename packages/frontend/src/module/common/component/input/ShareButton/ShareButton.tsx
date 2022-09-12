import SocialButton from "../../input/SocialButton/SocialButton";
import { useShare } from "./hook/useShare";
import { ShareButtonProps } from "./ShareButton.types";

export const ShareButton = ({ shareData }: ShareButtonProps): JSX.Element => {
    const { canShare, share } = useShare(shareData);
    return canShare ? <SocialButton icon="share" onClick={share} /> : <></>;
};

export default ShareButton;
