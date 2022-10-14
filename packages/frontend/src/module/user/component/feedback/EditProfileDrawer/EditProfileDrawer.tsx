import { createDrawer, DrawerProps, useToast } from "@peersyst/react-components";
import { UpdateUserRequest } from "module/api/service";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import { getUserRequestFromUserDTO } from "module/user/util/getUserRequestFromUserDTO";
import EditProfileDrawerBody from "./EditProfileDialogModalBody/EditProfileDrawerBody";
import { EditProfileDrawerRoot, EditProfileForm } from "./EditProfileDrawer.styles";
import EditProfileDrawerHeader from "./EditProfileDrawerHeader/EditProfileDrawerHeader";

const EditProfileDrawer = createDrawer(({ ...drawerProps }: DrawerProps) => {
    const { mutateAsync: updateUser } = useUpdateUser();
    const { showToast } = useToast();
    const { data: user = { address: "" } } = useGetWalletUser();
    const handleSumbit = async (newUser: UpdateUserRequest) => {
        const prevUser = getUserRequestFromUserDTO(user);
        const fUser = {
            ...prevUser,
            ...newUser,
        };
        await updateUser(fUser);
        showToast("Profile updated", { type: "success", position: "top-left" });
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
