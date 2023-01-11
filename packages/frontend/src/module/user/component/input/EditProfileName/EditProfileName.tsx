import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import TextField from "module/common/component/input/TextField/TextField";
import { useDebounce } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import useCheckNameAvailability from "module/user/query/useCheckNameAvailability";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { UpdateUserFields } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import { config } from "config";

const EditProfileName = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const { data: user = { name: "" } } = useGetWalletUser();
    const username = user.name || "";
    const { value, handleChange, debouncedValue, debouncing } = useDebounce(username);
    const { data: { available } = { exist: true }, isLoading: nameLoading } = useCheckNameAvailability(debouncedValue);

    const finalLoading = nameLoading || debouncing;

    const nameError = finalLoading || (!available && username !== value); //loading: error, if exists but is the current userName: no error
    const emptyError = username !== "" && value === ""; //if have a name do not allow to delete it
    const error = finalLoading || nameError || emptyError;

    return (
        <TextField
            name={UpdateUserFields.name}
            label={capitalize(translate("name"))}
            placeholder={translate("writeYour", { name: translate("name") })}
            defaultValue={username}
            value={value}
            onChange={handleChange}
            error={[error, translateError(emptyError ? "nameCanNotBeEmpty" : "userAlreadyExists")]}
            validators={{
                maxChars: config.maxUsernameChars,
            }}
            hideError={finalLoading}
            showValid={!finalLoading && value !== username}
            prefix="@"
            suffix={finalLoading && <LoaderIcon />}
        />
    );
};

export default EditProfileName;
