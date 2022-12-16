import SocialButton from "../../input/SocialButton/SocialButton";
import { useShare } from "./hook/useShare";
import { ShareButtonProps } from "./ShareButton.types";

export const ShareButton = ({ shareData, popover }: ShareButtonProps): JSX.Element => {
    const { canShare, share } = useShare(shareData);
    return <SocialButton icon="share" onClick={share} showOn={canShare ? "hover" : "click"} popover={popover} />;
};

export default ShareButton;
