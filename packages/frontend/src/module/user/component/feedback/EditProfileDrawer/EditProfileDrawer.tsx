import { createDrawer, DrawerProps } from "@peersyst/react-components";
import EditProfileDrawerBody from "./EditProfileDialogModalBody/EditProfileDrawerBody";
import { EditProfileDrawerRoot, EditProfileForm } from "./EditProfileDrawer.styles";
import EditProfileDrawerHeader from "./EditProfileDrawerHeader/EditProfileDrawerHeader";

const EditProfileDrawer = createDrawer(({ ...drawerProps }: DrawerProps) => {
    const handleSumbit = (e: any) => {
        console.log("submit", e);
    };
    return (
        <EditProfileDrawerRoot {...drawerProps}>
            <EditProfileForm onSubmit={handleSumbit}>
                <EditProfileDrawerHeader />
                <EditProfileDrawerBody />
            </EditProfileForm>
        </EditProfileDrawerRoot>
    );
});

export default EditProfileDrawer;
