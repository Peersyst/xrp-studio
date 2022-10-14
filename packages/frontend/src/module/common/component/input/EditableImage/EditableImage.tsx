import { Image, Row } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import useUploadFile from "module/common/query/useUploadFile";
import { useState } from "react";
import { UploadFileType } from "../FileInput/FileInput.types";
import { EditableImageLoader, EditableImageRoot, UploadBtn } from "./EditableImage.styles";
import { EditableImageProps } from "./EditableImage.types";

const uri2 =
    "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

const EditableImage = ({ className, onChange, children, loading, imageProps, ...uploadProps }: EditableImageProps): JSX.Element => {
    const t = useTranslate();
    const { src, alt, ...restImgProps } = imageProps || {};
    const [url, setUrl] = useState<string>(imageProps?.src || "");
    const { mutateAsync, isLoading: updating } = useUploadFile();
    const handleFileChange = async (file: UploadFileType) => {
        if (file && !("length" in file)) {
            const url = await mutateAsync(file);
            setUrl(uri2);
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
