import styled from "styled-components";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";
import { UploadInputRoot } from "module/common/component/input/UploadInput/UploadInput.styles";

export const AvatarImageInput = styled(ImageInput)`
    ${UploadInputRoot} {
        position: static;
    }
`;
