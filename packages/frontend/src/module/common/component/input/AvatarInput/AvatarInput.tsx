import Avatar from "../../display/Avatar/Avatar";
import { AvatarInputProps } from "./AvatarInput.types";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";

const AvatarInput = ({ size, alt, ...rest }: AvatarInputProps): JSX.Element => {
    return (
        <ImageInput alt={alt} {...rest}>
            {(url) => <Avatar size={size} img={url} alt={alt} />}
        </ImageInput>
    );
};

export default AvatarInput;