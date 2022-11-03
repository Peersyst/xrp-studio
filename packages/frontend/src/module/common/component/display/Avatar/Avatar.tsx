import { AvatarProps } from "module/common/component/display/Avatar/Avatar.types";
import { useState } from "react";
import { cx } from "@peersyst/react-utils";
import Hexagon from "module/common/component/display/Hexagon/Hexagon";

const Avatar = ({ img, alt, loading: loadingProp, className, ...rest }: AvatarProps): JSX.Element => {
    const [loading, setLoading] = useState(true);

    return (
        <Hexagon loading={loadingProp || loading} className={cx("avatar", className)} {...rest}>
            <img src={img} alt={alt} onLoad={() => setLoading(false)} />
        </Hexagon>
    );
};

export default Avatar;
