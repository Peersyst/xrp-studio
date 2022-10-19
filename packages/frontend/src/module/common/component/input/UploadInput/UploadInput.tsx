import { UploadInputProps } from "module/common/component/input/UploadInput/UploadInput.types";
import { FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { UploadBtn, UploadInputLoader, UploadInputRoot } from "./UploadInput.styles";
import { ImageIcon } from "icons";
import useUploadFile from "module/common/query/useUploadFile";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";

const UploadInput = ({
    loading = false,
    children,
    Label = FormControlLabel,
    LabelProps = {},
    defaultValue,
    uploadPath,
    fileTypes,
    ...rest
}: UploadInputProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync, isLoading: updating } = useUploadFile(uploadPath);

    return (
        <FormControl Label={[Label, LabelProps]} defaultValue={defaultValue} {...rest}>
            {(value, setValue) => {
                const handleFileChange = async (file: File | undefined) => {
                    if (file) {
                        const url = await mutateAsync(file);
                        setValue(url);
                    }
                };

                return (
                    <UploadInputRoot
                        multiple={false}
                        fileTypes={fileTypes}
                        onChange={(f) => handleFileChange(f as File)}
                        className={cx("upload-input", updating && "updating", loading && "loading")}
                    >
                        {(drag) => (
                            <>
                                {children(value)}
                                <UploadInputLoader className={cx("upload-input-loader", drag && "drag", updating && "updating")} />
                                <UploadBtn
                                    variant="glass"
                                    size="sm"
                                    rounded
                                    className={cx("upload-btn", drag && "drag", updating && "updating", loading && "loading")}
                                >
                                    <Row gap="0.5rem" alignItems="center">
                                        <ImageIcon css={{ fontSize: "1.4rem" }} />
                                        {translate("change")}
                                    </Row>
                                </UploadBtn>
                            </>
                        )}
                    </UploadInputRoot>
                );
            }}
        </FormControl>
    );
};

export default UploadInput;
