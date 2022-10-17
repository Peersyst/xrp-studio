import { Drawer, Form } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const EditProfileDrawerRoot = styled(Drawer)(
    () => css`
        padding: 0;
        overflow-x: hidden;
    `,
);

export const EditProfileForm = styled(Form)(
    () => css`
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        display: flex;
        height: 100%;
        row-gap: 3rem;
    `,
);
