import { Col } from "@peersyst/react-components";
import { ReactElement } from "react";

export interface FiltersContainerProps {
    children: ReactElement;
}

function FiltersContainer({ children }: FiltersContainerProps): JSX.Element {
    return (
        <Col flex={1} className="filters-cont">
            {children}
        </Col>
    );
}

export default FiltersContainer;
