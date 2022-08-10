import { SocialButtonRoot } from "module/common/component/input/SocialButton/SocialButton.styles";
import { SocialButtonProps } from "module/common/component/input/SocialButton/SocialButton.types";
import { image } from "asset";

const SocialButton = ({ platform, user }: SocialButtonProps): JSX.Element => {
    return (
        <SocialButtonRoot>
            <>
                {platform === "twitter" && <img src={image.twitter} alt="twitter" />}
                {platform === "instagram" && <img src={image.instagram} alt="instagram" />}
                {platform === "share" && <img src={image.share} alt="share" />}
            </>
        </SocialButtonRoot>
    );
};

export default SocialButton;
