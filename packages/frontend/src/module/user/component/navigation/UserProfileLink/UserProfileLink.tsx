import { UserDto } from "module/api/service";
import { CSSProperties } from "react";
import Avatar from "module/common/component/display/Avatar/Avatar";
import { Hash, Row, Typography, TypographyProps } from "@peersyst/react-components";
import { UserProfileLinkRoot } from "module/user/component/navigation/UserProfileLink/UserProfileLink.styles";

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
        <UserProfileLinkRoot to={`/user/${address}`} {...rest}>
            <Row flex={1} alignItems="center" gap="0.75rem">
                <Avatar img={image} alt={`${name || "user"}-image`} size="sm" />
                <span css={{ width: "100%", maxWidth: "75%" }}>
                    {name ? (
                        <Typography variant={variant} fontWeight={fontWeight} singleLine>
                            {name}
                        </Typography>
                    ) : (
                        <Hash hash={address} variant={variant} fontWeight={fontWeight} copy={false} />
                    )}
                </span>
            </Row>
        </UserProfileLinkRoot>
    );
};

export default UserProfileLink;
