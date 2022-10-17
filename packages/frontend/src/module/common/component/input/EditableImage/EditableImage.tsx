import { Image, Row } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import useUploadFile from "module/common/query/useUploadFile";
import { useState } from "react";
import { UploadFileType } from "../FileInput/FileInput.types";
import { EditableImageLoader, EditableImageRoot, UploadBtn } from "./EditableImage.styles";
import { EditableImageProps } from "./EditableImage.types";

const EditableImage = ({ className, onChange, children, loading, imageProps, ...uploadProps }: EditableImageProps): JSX.Element => {
    const t = useTranslate();
    const { src, alt, ...restImgProps } = imageProps || {};
    const [url, setUrl] = useState<string>(imageProps?.src || "");
    const { mutateAsync, isLoading: updating } = useUploadFile();
    const handleFileChange = async (file: UploadFileType) => {
        if (file && !("length" in file)) {
            const url = await mutateAsync(file);
            setUrl(url);
            onChange?.(url);
        }
    };

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
                        {src && (
                            <Image
                                {...restImgProps}
                                src={url}
                                alt={alt ?? "editable-img"}
                                className={cx("editable-img", loading && "loading", drag && "drag")}
                            />
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
