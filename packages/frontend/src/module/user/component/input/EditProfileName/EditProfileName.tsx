import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import useCheckNameAvailability from "module/user/query/useCheckNameAvailability";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { Dispatch, SetStateAction } from "react";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import { UserValidator } from "./util/ProfileValidator";

interface EditProfileNameProps {
    setName: Dispatch<SetStateAction<string>>;
    name: string;
}

const EditProfileName = ({ setName, name }: EditProfileNameProps): JSX.Element => {
    const { data: user = { name: "" } } = useGetWalletUser();
    const { data: valid = true, isLoading } = useCheckNameAvailability(name);
    console.log("valid", valid);
    console.log("isLoading", isLoading);
    const t = useTranslate();
    const tErr = useTranslate("error");
    const onQuery = (value: string) => {
        setName(value);
    };
    const { value, onChange } = useSearchBar({ onQuery, delay: 800 });

    return (
        <TextField
            prefix="@"
            value={value}
            customValidators={[new UserValidator(tErr("userAlreadyExists"), valid)]}
            onChange={onChange}
            placeholder={t("writeYour", { name: t("name") })}
            label={capitalize(t("name"))}
            name={userEditNames.name}
            defaultValue={user?.name}
            suffix={isLoading && <LoaderIcon />}
        />
    );
};

export default EditProfileName;
