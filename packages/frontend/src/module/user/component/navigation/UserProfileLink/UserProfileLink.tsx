import { UserDto } from "module/api/service";
import { CSSProperties } from "react";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { Hash, Row, TypographyProps } from "@peersyst/react-components";
import { UserProfileLinkRoot } from "module/user/component/navigation/UserProfileLink/UserProfileLink.styles";
import { UserRoutes } from "module/user/UserRouter";
import Username from "module/user/component/Username/Username";

export interface UserProfileLinkProps {
    user: UserDto;
    variant?: TypographyProps["variant"];
    fontWeight?: TypographyProps["fontWeight"];
    className?: string;
    style?: CSSProperties;
}

const UserProfileLink = ({
    user: { image, address, name },
    variant = "body1",
    fontWeight = 600,
    ...rest
}: UserProfileLinkProps): JSX.Element => {
    return (
        <UserProfileLinkRoot to={UserRoutes.PROFILE.replace(":address", address)} {...rest}>
            <Row flex={1} alignItems="center" gap="0.75rem" css={{ overflow: "hidden" }}>
                <Avatar img={image} alt={`${name || "user"}-image`} size="sm" />
                <span css={{ overflow: "hidden" }}>
                    {name ? (
                        <Username name={name} variant={variant} fontWeight={fontWeight} />
                    ) : (
                        <Hash hash={address} variant={variant} fontWeight={fontWeight} copy={false} />
                    )}
                </span>
            </Row>
        </UserProfileLinkRoot>
    );
};

export default UserProfileLink;
