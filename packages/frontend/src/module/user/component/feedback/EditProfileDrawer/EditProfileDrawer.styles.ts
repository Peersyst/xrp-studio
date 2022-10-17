import { Drawer } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const EditProfileDrawerRoot = styled(Drawer)(
    () => css`
        padding: 0;
        overflow-x: hidden;
    `,
);
