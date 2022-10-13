import { Image, Row } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import { UploadFileType } from "../FileInput/FileInput.types";
import { EditableImageLoader, EditableImageRoot, UploadBtn } from "./EditableImage.styles";
import { EditableImageProps } from "./EditableImage.types";

const EditableImage = ({
    className,
    onChange,
    updating,
    children,
    loading,
    imageProps,
    ...uploadProps
}: EditableImageProps): JSX.Element => {
    const t = useTranslate();
    const handleFileChange = (file: UploadFileType) => {
        if (file && !("length" in file)) {
            onChange?.(file);
        }
    };
    const imgClassName = imageProps?.className;
    imageProps && delete imageProps["className"];

    return (
        <EditableImageRoot
            onChange={handleFileChange}
            multiple={false}
            fileTypes="image/*"
            className={cx("editable-image", updating && "updating", loading && "loading", className)}
            {...uploadProps}
        >
            {(drag) => {
                return (
                    <>
                        {children}
                        {imageProps && (
                            <Image {...imageProps} className={cx("editable-img", loading && "loading", drag && "drag", imgClassName)} />
                        )}
                        <EditableImageLoader className={cx("editable-image-loader", drag && "drag", updating && "updating")} />
                        <UploadBtn
                            variant="glass"
                            size="sm"
                            rounded
                            className={cx("upload-btn", drag && "drag", loading && "loading", updating && "updating")}
                        >
                            <Row gap="0.5rem" alignItems="center">
                                <ImageIcon css={{ fontSize: "1.4rem" }} />
                                {t("change")}
                            </Row>
                        </UploadBtn>
                    </>
                );
            }}
        </EditableImageRoot>
    );
};

export default EditableImage;
