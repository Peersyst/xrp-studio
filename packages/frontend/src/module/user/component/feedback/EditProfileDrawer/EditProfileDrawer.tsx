import { createDrawer, DrawerProps, useDrawer, useToast } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import EditProfileDrawerBody from "./EditProfileDrawerBody/EditProfileDrawerBody";
import { EditProfileDrawerRoot, EditProfileForm } from "./EditProfileDrawer.styles";
import EditProfileDrawerHeader from "./EditProfileDrawerHeader/EditProfileDrawerHeader";
import { EditUserFormFields, UpdateUserFields as UpdateUserFieldsType } from "./EditProfileDrawer.types";
import createUserRequestFromUserDTO from "module/user/util/createUserRequestFromUserDTO";

export const UpdateUserFields: Record<UpdateUserFieldsType, UpdateUserFieldsType> = {
    name: "name",
    description: "description",
    twitter: "twitter",
    discord: "discord",
    header: "header",
    image: "image",
};

const EditProfileDrawer = createDrawer(({ ...drawerProps }: Omit<DrawerProps, "children">) => {
    const { mutateAsync: updateUser } = useUpdateUser();
    const { showToast } = useToast();
    const { hideDrawer } = useDrawer();
    const { data: user = { address: "" }, refetch: refetchGetWalletUser } = useGetWalletUser();
    const translateSuccess = useTranslate("success");

    const handleSubmit = async (newUser: EditUserFormFields) => {
        const finalUser = {
            ...user,
            ...newUser,
        };
        await updateUser(createUserRequestFromUserDTO(finalUser));
        await refetchGetWalletUser();
        hideDrawer(EditProfileDrawer.id);
        showToast(translateSuccess("profileUpdated"), { type: "success" });
    };
    return (
        <EditProfileDrawerRoot {...drawerProps}>
            <EditProfileForm onSubmit={handleSubmit}>
                <EditProfileDrawerHeader />
                <EditProfileDrawerBody />
            </EditProfileForm>
        </EditProfileDrawerRoot>
    );
});

export default EditProfileDrawer;
