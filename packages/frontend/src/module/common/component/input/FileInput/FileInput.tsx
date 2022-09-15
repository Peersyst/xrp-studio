import { Col } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { CloseIcon } from "icons";
import FileDisplay from "./FileDisplay/FileDisplay";
import { FileInputUpload, FileInputRoot, RemoveFileIcon } from "./FileInput.styles";
import FileInputPlaceholder from "./FileInputPlaceholder/FileInputPlaceholder";
import { FileInputProps, FileInputType, UploadFileType } from "./FileInput.types";
import { useControlled } from "@peersyst/react-hooks";

const FileInput = ({ className, supportedFilesLabel, style, defaultValue, value, onChange, ...rest }: FileInputProps): JSX.Element => {
    const [file, setFile] = useControlled<FileInputType>(defaultValue, value, onChange);
    const handleFileChange = (f: UploadFileType) => {
        if (f && !("length" in f)) {
            setFile(f);
        }
    };
    return (
        <FileInputRoot data-testid="upload" className={(cx("file-input"), className)} style={style}>
            <FileInputUpload multiple={false} value={file} onChange={handleFileChange} {...rest}>
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
            </FileInputUpload>
            {file && (
                <RemoveFileIcon style={{ pointerEvents: "all" }} onClick={() => setFile(undefined)}>
                    <CloseIcon />
                </RemoveFileIcon>
            )}
        </FileInputRoot>
    );
};

export default FileInput;
