import { UsernameProps } from "module/user/component/Username/Username.types";
import { Skeleton, Typography } from "@peersyst/react-components";
import { UsernameRoot, VerifiedIcon } from "module/user/component/Username/Username.styles";
import { cx } from "@peersyst/react-utils";

const Username = ({
    variant,
    name,
    verified = false,
    loading = false,
    className,
    style,
    ...typographyProps
}: UsernameProps): JSX.Element => (
    <UsernameRoot variant={variant} className={cx("username", className)} style={style}>
        <Skeleton loading={loading}>
            <Typography variant={variant} singleLine css={{ width: "auto" }} {...typographyProps}>
                {loading ? "loading_name" : name}
            </Typography>
        </Skeleton>
        {verified && <VerifiedIcon />}
    </UsernameRoot>
);

export default Username;
