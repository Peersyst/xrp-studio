import { AvatarInputProps } from "./AvatarInput.types";
import Hexagon from "module/common/component/display/Hexagon/Hexagon";
import { Image } from "@peersyst/react-components";
import { AvatarImageInput } from "module/common/component/input/AvatarInput/AvatarInput.styles";

const AvatarInput = ({ size, alt, className, style, loading, placeholderVariant, ...rest }: AvatarInputProps): JSX.Element => {
    return (
        <Hexagon size={size} className={className} style={style} loading={loading}>
            <AvatarImageInput
                alt={alt}
                placeholder={{ type: "compact", variant: placeholderVariant }}
                changeButton={{ label: false }}
                loading={loading}
                multiple={false}
                {...rest}
            >
                {(url) => <Image src={url as string} alt={alt} css={{ position: "static" }} />}
            </AvatarImageInput>
        </Hexagon>
    );
};

export default AvatarInput;
