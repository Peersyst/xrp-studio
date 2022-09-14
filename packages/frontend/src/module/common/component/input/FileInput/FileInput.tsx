import { Col } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { CloseIcon } from "icons";
import FileDisplay from "./FileDisplay/FileDisplay";
import { FileInputCard, FileInputRoot, RemoveFileIcon } from "./FileInput.styles";
import FileInputPlaceholder from "./FileInputPlaceholder/FileInputPlaceholder";
import { FileInputProps, UploadFileType } from "./FileInput.types";
import { useControlled } from "@peersyst/react-hooks";

const FileInput = ({
    className,
    supportedFilesLabel,
    style,
    defaultValue,
    file: fileProp,
    onChange,
    ...rest
}: FileInputProps): JSX.Element => {
    const [file, setFile] = useControlled<File | undefined>(defaultValue, fileProp, onChange);
    const handleFileChange = (f: UploadFileType) => {
        if (f && !("length" in f)) {
            setFile(f);
        }
    };
    return (
        <FileInputCard data-testid="upload" className={(cx("file-input"), className)} style={style}>
            <FileInputRoot multiple={false} value={file} onChange={handleFileChange} {...rest}>
                {(drag) => {
                    return (
                        <Col
                            className="placeholder-col"
                            css={{ height: "100%" }}
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            gap="2.5rem"
                        >
                            {file ? (
                                <FileDisplay file={file} />
                            ) : (
                                <FileInputPlaceholder drag={drag} supportedFilesLabel={supportedFilesLabel} />
                            )}
                        </Col>
                    );
                }}
            </FileInputRoot>
            {file && (
                <RemoveFileIcon style={{ pointerEvents: "all" }} onClick={() => setFile(undefined)}>
                    <CloseIcon />
                </RemoveFileIcon>
            )}
        </FileInputCard>
    );
};

export default FileInput;
