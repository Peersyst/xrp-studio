import Button from "module/common/component/input/Button/Button";
import styled from "styled-components";

export const NftDisplayRoot = styled.div`
    position: relative;
`;

export const PhygitalQrButton = styled(Button).attrs({ variant: "glass" })`
    position: absolute;
    top: 1rem;
    left: 1rem;

    min-width: 3.5rem;
    max-width: 3.5rem;
    min-height: 3.5rem;
    max-height: 3.5rem;
    padding: 0;
`;
