import styled, { css } from "styled-components";
import CoverInput from "module/common/component/input/CoverInput/CoverInput";

export const EditProfileCoverRoot = styled(CoverInput)(
    () => css`
        height: 10.75rem;

        .Upload {
            border-radius: 0;
        }
    `,
);
