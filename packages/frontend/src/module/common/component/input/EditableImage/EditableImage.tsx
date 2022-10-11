import { Row } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { ImageIcon } from "icons";
import useTranslate from "module/common/hook/useTranslate";
import { useState } from "react";
import { UploadFileType } from "../FileInput/FileInput.types";
import { EditableImageBackdrop, EditableImageLoader, EditableImageRoot, UploadBtn } from "./EditableImage.styles";
import { EditableImageProps } from "./EditableImage.types";

const EditableImage = ({ className, value, onChange, updating, children, ...uploadProps }: EditableImageProps): JSX.Element => {
    const t = useTranslate();
    const handleFileChange = (file: UploadFileType) => {
        if (file && !("length" in file)) {
            onChange?.(file);
        }
    };
    return (
        <EditableImageRoot
            onChange={handleFileChange}
            multiple={false}
            fileTypes="image/*"
            className={cx("editable-image", className)}
            {...uploadProps}
        >
            {(drag) => {
                return (
                    <>
                        {children}
                        <EditableImageLoader className={cx(drag && "drag", updating && "updating")} />
                        <EditableImageBackdrop className={cx(drag && "drag", updating && "updating")} />
                        <UploadBtn variant="glass" size="sm" rounded className="UploadBtn">
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
