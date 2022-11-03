import styled, { css } from "styled-components";
import UploadInput from "module/common/component/input/UploadInput/UploadInput";

export const ImageInputRoot = styled(UploadInput)(
    () => css`
        .Skeleton {
            width: 100%;
            max-width: 100%;
        }

        .upload-input {
            &.updating,
            &.Drag {
                img {
                    filter: blur(4px);
                }
            }
        }
    `,
);
