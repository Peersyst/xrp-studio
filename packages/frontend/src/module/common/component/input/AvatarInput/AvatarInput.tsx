import { AvatarInputProps } from "./AvatarInput.types";
import Hexagon from "module/common/component/display/Hexagon/Hexagon";
import { Image } from "@peersyst/react-components";
import { AvatarImageInput } from "module/common/component/input/AvatarInput/AvatarInput.styles";

const AvatarInput = ({ size, alt, className, style, loading, ...rest }: AvatarInputProps): JSX.Element => {
    return (
        <Hexagon size={size} className={className} style={style} loading={loading}>
            <AvatarImageInput alt={alt} placeholder={{ type: "compact" }} changeButton={{ label: false }} loading={loading} {...rest}>
                {(url) => <Image src={url} alt={alt} css={{ position: "static" }} />}
            </AvatarImageInput>
        </Hexagon>
    );
};

export default AvatarInput;
