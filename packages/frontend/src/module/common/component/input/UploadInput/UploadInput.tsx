import { UploadInputProps } from "module/common/component/input/UploadInput/UploadInput.types";
import { FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { UploadBtn, UploadInputRoot } from "./UploadInput.styles";
import { ImageIcon } from "icons";
import useUploadFile from "module/common/query/useUploadFile";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import UploadInputPlaceholder from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder";
import { isValidElement } from "react";

function UploadInput<Multiple extends boolean = false>({
    onUpload,
    loading = false,
    children,
    Label = FormControlLabel,
    LabelProps = {},
    defaultValue,
    uploadPath,
    fileTypes,
    readonly,
    disabled,
    changeButton,
    placeholder,
    multiple,
    ...rest
}: UploadInputProps<Multiple>): JSX.Element {
    const translate = useTranslate();

    const editable = !readonly && !disabled;

    const { mutateAsync: uploadFile, isLoading: updating } = useUploadFile(uploadPath);

    const changeButtonLabel = changeButton?.label ?? true;
    const parsedChangeButtonLabel = changeButtonLabel === true ? translate("change") : changeButtonLabel;

    return (
        <FormControl
            Label={[Label, LabelProps]}
            defaultValue={defaultValue}
            readonly={readonly}
            disabled={disabled}
            css={{ alignSelf: "unset" }}
            {...rest}
        >
            {(value, setValue) => {
                const handleFileChange = async (file: File | FileList | undefined) => {
                    if (file) {
                        if (length in file) {
                            const fileList = file as FileList;
                            onUpload?.(fileList.length);
                            const urls = [...(value || [])];
                            for (let i = 0; i < fileList.length; i++) {
                                const url = await uploadFile(fileList.item(i)!);
                                urls.push(url);
                            }
                            // @ts-ignore Safe as Multiple = true is ensured by FileList type
                            setValue(urls);
                        } else {
                            onUpload?.(1);
                            const url = await uploadFile(file as File);
                            // @ts-ignore Safe as Multiple = false is ensured by File type
                            setValue(url);
                        }
                    }
                };

                return (
                    <UploadInputRoot
                        multiple={multiple}
                        fileTypes={fileTypes}
                        onChange={handleFileChange}
                        className={cx("upload-input", updating && "updating", loading && "loading")}
                        readonly={readonly}
                        disabled={disabled}
                    >
                        {(drag) => (
                            <>
                                {value ? (
                                    <>
                                        {children(value, drag)}
                                        {editable && (
                                            <UploadBtn
                                                alignment={changeButton?.alignment}
                                                variant="glass"
                                                size="sm"
                                                rounded
                                                className={cx("upload-btn", drag && "drag", updating && "updating", loading && "loading")}
                                                loading={updating}
                                            >
                                                <Row gap="0.5rem" alignItems="center">
                                                    <ImageIcon css={{ fontSize: "1.5rem" }} />
                                                    {parsedChangeButtonLabel}
                                                </Row>
                                            </UploadBtn>
                                        )}
                                    </>
                                ) : // as any is safe here, as placeholder type is ensured by placeholderChild presence
                                isValidElement(placeholder) ? (
                                    placeholder
                                ) : (
                                    <UploadInputPlaceholder disabled={disabled} drag={drag} {...placeholder} />
                                )}
                            </>
                        )}
                    </UploadInputRoot>
                );
            }}
        </FormControl>
    );
}

export default UploadInput;
