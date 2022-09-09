import useGetUser from "module/user/query/useGetUser";
import { BlockchainAddress, Col, Row, Skeleton, Typography, useTheme } from "@peersyst/react-components";
import { ProfileButtons, ProfileInfoRoot } from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";
import Button from "module/common/component/input/Button/Button";
import { useMediaQuery } from "@peersyst/react-hooks";

const ProfileInfo = (): JSX.Element => {
    const { data: user, isLoading } = useGetUser();
    const { name, address = "", description } = user || {};

    const {
        breakpoints: {
            values: { sm },
        },
    } = useTheme();
    const isSm = useMediaQuery(`(max-width: ${sm}px)`);

    return (
        <ProfileInfoRoot>
            <Col gap="0.5rem">
                <Row justifyContent="space-between">
                    <Row gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton loading={isLoading}>
                            <Typography className="profile-name" variant="h5" fontWeight={800}>
                                {name}
                            </Typography>
                        </Skeleton>
                        <Skeleton width="331px" loading={isLoading}>
                            <BlockchainAddress
                                className="account-address"
                                variant="body1"
                                address={address}
                                type="address"
                                length={isSm ? 3 : "auto"}
                            />
                        </Skeleton>
                    </Row>
                    {!isLoading && (
                        <ProfileButtons>
                            <Button>Edit profile</Button>
                        </ProfileButtons>
                    )}
                </Row>
                <Skeleton width="90%" loading={isLoading}>
                    <Typography className="profile-description" variant="body1" light singleLine>
                        {description}
                    </Typography>
                </Skeleton>
            </Col>
        </ProfileInfoRoot>
    );
};

export default ProfileInfo;
