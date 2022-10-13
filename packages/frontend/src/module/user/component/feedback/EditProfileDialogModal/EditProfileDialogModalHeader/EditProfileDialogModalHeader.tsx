import { Col } from "@peersyst/react-components";
import EditProfileCover from "module/user/component/input/EditProfileCover/EditProfileCover";
import EditableProfileImage from "module/user/component/input/EditProfileImage/EditProfileImage";

const EditProfileDialogModalHeader = (): JSX.Element => {
    return (
        <Col alignItems="center">
            <EditProfileCover />
            <EditableProfileImage css={{ marginTop: "-4.5rem" }} />
            <Col css={{ padding: "1.5rem" }} gap="1rem">
                <h1 css={{ fontSize: "1.5rem", fontWeight: "bold" }}>Edit Profile</h1>
            </Col>
        </Col>
    );
};

export default EditProfileDialogModalHeader;
