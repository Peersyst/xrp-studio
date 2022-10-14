import EditableImage from "module/common/component/input/EditableImage/EditableImage";
import styled, { css } from "styled-components";

export const EditProfileCoverRoot = styled(EditableImage)(
    () => css`
        .Image {
            height: 10.75rem;
            border-radius: 0rem;
            object-fit: cover;
        }
        .Skeleton {
            border-radius: 0rem;
            width: 100vw;
            max-width: 100%;
        }
        .upload-btn {
            top: 0.5rem;
            right: 0.5rem;
            transform: unset;
            left: auto;
        }
        .editable-image-loader.updating {
            transform: translate(-50%, -175%);
        }
    `,
);
