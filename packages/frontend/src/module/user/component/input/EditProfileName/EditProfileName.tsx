import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { Dispatch, SetStateAction, useState } from "react";
import { userEditNames } from "../EditProfileFormFields/EditProfileFormFields";
import { UserValidator } from "./util/ProfileValidator";

interface EditProfileNameProps {
    setValidating: Dispatch<SetStateAction<boolean>>;
    validating: boolean;
}

const EditProfileName = ({ setValidating, validating }: EditProfileNameProps): JSX.Element => {
    const { data: user = { name: "" } } = useGetWalletUser();
    const [isValid, setIsValid] = useState(true);
    const t = useTranslate();
    const tErr = useTranslate("error");
    const onQuery = async (value: string) => {
        setValidating(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsValid(value.length % 7 !== 0);
        setValidating(false);
    };
    const { value, onChange } = useSearchBar({ onQuery, delay: 800 });

    return (
        <TextField
            prefix="@"
            value={value}
            customValidators={[new UserValidator(tErr("userAlreadyExists"), isValid)]}
            onChange={onChange}
            placeholder={t("writeYour", { name: t("name") })}
            label={capitalize(t("name"))}
            name={userEditNames.name}
            defaultValue={user?.name}
            suffix={validating && <LoaderIcon />}
        />
    );
};

export default EditProfileName;
