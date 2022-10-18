import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { useSearchBar } from "module/common/component/input/SearchBar/hook/useSearchBar";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import useCheckNameAvailability from "module/user/query/useCheckNameAvailability";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useState } from "react";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";

const EditProfileName = (): JSX.Element => {
    const t = useTranslate();
    const tErr = useTranslate("error");

    const { data: user = { name: "" }, isLoading: userLoading } = useGetWalletUser();
    const [qName, setQName] = useState(user.name);
    const { data: { exist } = { exist: true }, isLoading: nameLoading } = useCheckNameAvailability(qName);

    const onQuery = (value: string) => setQName(value.trim());
    const { value, onChange, loading: debouncing } = useSearchBar({ onQuery, delay: 800 });

    const finalLoading = nameLoading || debouncing || userLoading;
    const error = exist && value !== undefined && value !== user.name;

    return (
        <TextField
            prefix="@"
            value={value}
            error={error && [error, tErr("userAlreadyExists")]}
            onChange={onChange}
            placeholder={t("writeYour", { name: t("name") })}
            label={capitalize(t("name"))}
            name={userEditNames.name}
            defaultValue={user?.name}
            suffix={finalLoading && <LoaderIcon />}
            hideError={finalLoading}
        />
    );
};

export default EditProfileName;
