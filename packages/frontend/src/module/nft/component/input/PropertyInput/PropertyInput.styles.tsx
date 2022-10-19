import styled, { css } from "styled-components";
import { IconButton, Row } from "@peersyst/react-components";
import { PropertyInputRootProps } from "module/nft/component/input/PropertyInput/PropertyInput.types";
import TextField from "module/common/component/input/TextField/TextField";
import { TrashIcon } from "icons";

export const PropertyInputRoot = styled(Row).attrs({ gap: "1rem", alignItems: "center" })<PropertyInputRootProps>(
    ({ hasLabel }) => css`
        width: ${hasLabel && "100%"};
    `,
);

export const PropertyInputTextField = styled(TextField)`
    flex: 1;
`;

export const DeletePropertyButton = styled(IconButton).attrs({ children: <TrashIcon /> })(
    ({ theme }) => css`
        font-size: 1.5rem;
        color: ${theme.palette.black[30]};
    `,
);
