import { Col } from "@peersyst/react-components";
import EditProfileCover from "module/user/component/input/EditProfileCover/EditProfileCover";
import EditProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

const EditProfileDrawerHeader = (): JSX.Element => {
    return (
        <Col alignItems="center">
            <EditProfileCover />
            <div css={{ marginTop: "-5.25rem", position: "relative" }}>
                <EditProfileImage />
            </div>
        </Col>
    );
};

export default EditProfileDrawerHeader;
