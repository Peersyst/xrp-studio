import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import useCheckNameAvailability from "module/user/query/useCheckNameAvailability";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { Dispatch, SetStateAction, useState } from "react";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import { UserValidator } from "./util/ProfileValidator";

interface EditProfileNameProps {
    setValidating: Dispatch<SetStateAction<boolean>>;
    validating: boolean;
}

const EditProfileName = ({ setValidating, validating }: EditProfileNameProps): JSX.Element => {
    const { data: user = { name: "" } } = useGetWalletUser();
    const [qName, setQName] = useState(user.name);
    const { data: exist, isLoading } = useCheckNameAvailability(qName);
    const t = useTranslate();
    const tErr = useTranslate("error");
    const onQuery = (value: string) => {
        setQName(value);
    };
    const { value, onChange, loading: debouncing } = useSearchBar({ onQuery, delay: 800 });
    const finalLoading = isLoading || debouncing;
    return (
        <TextField
            prefix="@"
            value={value}
            customValidators={[new UserValidator(tErr("userAlreadyExists"), !exist)]}
            onChange={onChange}
            placeholder={t("writeYour", { name: t("name") })}
            label={capitalize(t("name"))}
            name={userEditNames.name}
            defaultValue={user?.name}
            suffix={finalLoading && <LoaderIcon />}
        />
    );
};

export default EditProfileName;
