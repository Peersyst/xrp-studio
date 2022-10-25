import { Drawer, Form } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const EditProfileDrawerRoot = styled(Drawer)(
    () => css`
        padding: 0;
    `,
);

export const EditProfileForm = styled(Form)(
    () => css`
        flex: 1;
        flex-direction: column;
        display: flex;
        height: 100%;
        row-gap: 3rem;
    `,
);
