import styled from "styled-components";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import { UploadInputRoot } from "module/common/component/input/UploadInput/UploadInput.styles";
import { JSXElementConstructor } from "react";
import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";

export const AvatarImageInput = styled(ImageInput)`
    ${UploadInputRoot} {
        position: static;
    }
` as JSXElementConstructor<ImageInputProps<false>>;
