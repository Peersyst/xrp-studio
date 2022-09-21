import { cx } from "@peersyst/react-utils";
import { CloseIcon } from "icons";
import FileDisplay from "./FileDisplay/FileDisplay";
import { FileInputWrapper, RemoveFileIcon, FileInputRoot } from "./FileInput.styles";
import FileInputPlaceholder from "./FileInputPlaceholder/FileInputPlaceholder";
import { FileInputProps, FileInputType, UploadFileType } from "./FileInput.types";
import { useControlled } from "@peersyst/react-hooks";
import { Upload } from "@peersyst/react-components";

const FileInput = ({
    className,
    style,
    multiple,
    supportedFilesLabel,
    defaultValue,
    value,
    onChange,
    ...rest
}: FileInputProps): JSX.Element => {
    const [file, setFile] = useControlled<FileInputType>(defaultValue, value, onChange);
    const handleFileChange = (f: UploadFileType) => {
        if (f) {
            if ("length" in f) {
                const newFiles: File[] = [];
                for (let i = 0; i < f.length; i++) {
                    newFiles.push(f[i]);
                }
                setFile(newFiles);
            } else {
                setFile(f);
            }
        }
    };
    const handleRemoveFiles = () => {
        setFile(undefined);
    };
    return (
        <FileInputRoot className={cx("file-input", className)} data-testid="upload" style={style}>
            <Upload multiple={multiple} onChange={handleFileChange} {...rest}>
                {(drag) => {
                    return (
                        <FileInputWrapper className="file-input-wrapper">
                            {file ? (
                                <FileDisplay file={file} />
                            ) : (
                                <FileInputPlaceholder drag={drag} supportedFilesLabel={supportedFilesLabel} />
                            )}
                        </FileInputWrapper>
                    );
                }}
            </Upload>
            {file && (
                <RemoveFileIcon onClick={handleRemoveFiles}>
                    <CloseIcon />
                </RemoveFileIcon>
            )}
        </FileInputRoot>
    );
};

export default FileInput;
