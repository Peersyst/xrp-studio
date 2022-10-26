import { Col, Row } from "@peersyst/react-components";
import EditProfileCover from "module/user/component/input/EditProfileCover/EditProfileCover";
import EditProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

const EditProfileDrawerHeader = (): JSX.Element => {
    return (
        <Col alignItems="center">
            <EditProfileCover />
            <Row>
                <EditProfileImage css={{ marginTop: "-5.25rem" }} />
            </Row>
        </Col>
    );
};

export default EditProfileDrawerHeader;
