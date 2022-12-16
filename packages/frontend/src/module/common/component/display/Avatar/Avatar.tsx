import { AvatarProps } from "module/common/component/display/Avatar/Avatar.types";
import { cx } from "@peersyst/react-utils";
import Hexagon from "module/common/component/display/Hexagon/Hexagon";
import { useImageSrc } from "@peersyst/react-components";

const Avatar = ({ img, alt, loading: loadingProp, className, fallback, ...rest }: AvatarProps): JSX.Element => {
    const { src, handleLoad, loaded, handleError } = useImageSrc(img, fallback);

    return (
        <Hexagon loading={loadingProp || !loaded} className={cx("avatar", className)} {...rest}>
            <img src={src} alt={alt} onLoad={handleLoad} onError={handleError} />
        </Hexagon>
    );
};

export default Avatar;
