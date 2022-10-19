import styled, { css } from "styled-components";
import ImageInput from "module/common/component/input/ImageInput/ImageInput";

export const EditProfileCoverRoot = styled(ImageInput)(
    () => css`
        .upload-input {
            .image-input-img {
                height: 10.75rem;
                border-radius: 0;
            }

            .Skeleton {
                width: 100vw;
                max-width: 100%;
            }

            .upload-btn {
                top: 0.5rem;
                right: 0.5rem;
                transform: unset;
                left: auto;
            }

            .upload-input-loader.updating {
                transform: translate(-50%, -175%);
            }
        }
    `,
);
