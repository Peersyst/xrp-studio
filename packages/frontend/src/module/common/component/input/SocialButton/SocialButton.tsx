import { SocialButtonRoot } from "module/common/component/input/SocialButton/SocialButton.styles";
import { SocialButtonProps } from "module/common/component/input/SocialButton/SocialButton.types";
import { TwitterIcon } from "icons";

const SocialButton = ({ icon }: SocialButtonProps): JSX.Element => {
    return (
        <SocialButtonRoot>
            <TwitterIcon />
        </SocialButtonRoot>
    );
};

export default SocialButton;
