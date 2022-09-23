import { Col } from "@peersyst/react-components";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import ProfileNftsGrid from "../ProfileNftsGrid/ProfileNftsGrid";

const ProfileContent = (): JSX.Element => {
    return (
        <PageContent>
            <Col flex={1}>
                <ProfileNftsGrid />
            </Col>
        </PageContent>
    );
};

export default ProfileContent;
