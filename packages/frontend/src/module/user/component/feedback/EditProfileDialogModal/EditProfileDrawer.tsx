import { Col, createModal, DrawerProps } from "@peersyst/react-components";
import { EditProfileDrawerRoot } from "./EditProfileDrawer.styles";
import EditProfileDrawerHeader from "./EditProfileDrawerHeader/EditProfileDrawerHeader";

export interface EditProfileDrawerModalProps extends DrawerProps {}

const EditProfileDrawer = createModal(({ ...modalProps }: EditProfileDrawerModalProps) => {
    return (
        <EditProfileDrawerRoot {...modalProps} position="right">
            <EditProfileDrawerHeader />
            <Col css={{ padding: "1.5rem" }} gap="1rem">
                <h1 css={{ fontSize: "1.5rem", fontWeight: "bold" }}>Edit Profile</h1>
            </Col>
        </EditProfileDrawerRoot>
    );
});

export default EditProfileDrawer;
