import { LoaderIcon } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import TextField from "module/common/component/input/TextField/TextField";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import { CollectionCreationFormFields } from "module/collection/types";
import useCollectionNameAvailability from "module/collection/hook/useCollectionNameAvailability";
import { useDebounce } from "@peersyst/react-hooks";

export interface EditCollectionNameTextFieldProps {
    defaultValue?: string;
    onChange?: (name: string) => void;
}

const EditCollectionNameTextField = ({ defaultValue = "", onChange }: EditCollectionNameTextFieldProps): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");

    const { value, handleChange, debouncedValue, debouncing } = useDebounce(defaultValue, { onChange });
    const { data: available = { exist: true }, isLoading: nameLoading } = useCollectionNameAvailability(debouncedValue);

    const finalLoading = nameLoading || debouncing;

    const nameError = finalLoading || (!available && defaultValue !== value);
    const error = finalLoading || nameError;

    return (
        <TextField
            name={CollectionCreationFormFields.NAME}
            label={capitalize(translate("name"))}
            placeholder={translate("collectionNamePlaceholder")}
            defaultValue={defaultValue}
            value={value}
            onChange={handleChange}
            variant="filled"
            required
            error={[error, translateError("collectionNameAlreadyExists")]}
            validators={{
                maxChars: config.maxCollectionNameChars,
            }}
            hideError={finalLoading}
            showValid={!finalLoading && value !== defaultValue}
            suffix={finalLoading && <LoaderIcon />}
        />
    );
};

export default EditCollectionNameTextField;
