import { createDrawer, DrawerProps, useToast } from "@peersyst/react-components";
import { UserDto } from "module/api/service";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useUpdateUser } from "module/user/query/useUpdateUser";
import { getUserRequestFromUserDTO } from "module/user/util/getUserRequestFromUserDTO";
import EditProfileDrawerBody from "./EditProfileDrawerBody/EditProfileDrawerBody";
import { EditProfileDrawerRoot, EditProfileForm } from "./EditProfileDrawer.styles";
import { UpdateUserFields } from "./EditProfileDrawer.types";
import EditProfileDrawerHeader from "./EditProfileDrawerHeader/EditProfileDrawerHeader";
import { useRefetchQueries } from "../../../../../query/useRefetchQueries";
import Queries from "../../../../../query/queries";
/**
 * This json is used as a way to typecheck all names of the form.
 * The Form component does not have a way to ensure that all fields are typed correctly.
 * This typechecking will be necessary in the handleSumbit fn
 * handleSumbit(newUser: UserDto) => Promise<void>
 */
export const userEditNames: Record<UpdateUserFields, UpdateUserFields> = {
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
    const { data: user = { address: "" }, refetch: refetchGetWalletUser } = useGetWalletUser();
    const refetchQueries = useRefetchQueries();
    const tSuccess = useTranslate("success");

    const handleSumbit = async (newUser: UserDto) => {
        const finalUser = {
            ...user,
            ...newUser,
        };
        await updateUser(getUserRequestFromUserDTO(finalUser));
        await refetchGetWalletUser();
        await refetchQueries([Queries.NAME_AVAILABILITY, user.name || ""]);

        showToast(tSuccess("profileUpdated"), { type: "success", position: "top-left" });
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
