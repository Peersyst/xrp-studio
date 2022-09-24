import { Col } from "@peersyst/react-components";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import ProfileCollections from "../ProfileCollections/ProfileCollections";
import ProfileNftsGrid from "../ProfileNftsGrid/ProfileNftsGrid";

const ProfileContent = (): JSX.Element => {
    return (
        <PageContent>
            <Col flex={1} gap="4.25rem">
                <ProfileCollections />
                <ProfileNftsGrid />
            </Col>
        </PageContent>
    );
};

export default ProfileContent;
