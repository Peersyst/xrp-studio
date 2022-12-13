import styled from "styled-components";
import { Col } from "@peersyst/react-components";
import Modal from "module/common/component/feedback/Modal/Modal";

export const HeaderMenuRoot = styled(Modal)`
    && {
        margin-top: 1.5rem;
        height: auto;
        align-self: flex-start;

        ${(p) => p.theme.breakpoints.up("mobile")} {
            display: none;
        }
    }
`;

export const HeaderMenuLinksWrapper = styled(Col)`
    align-items: center;
    row-gap: 20px;
`;
