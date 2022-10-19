import { Row, Typography } from "@peersyst/react-components";
import { ReactElement } from "react";

export interface FilterItemProps {
    label: string;
    children: ReactElement;
}

const FilterItem = ({ label, children }: FilterItemProps): JSX.Element => {
    return (
        <Row justifyContent="space-between" gap="1.5rem">
            <Typography variant="body1" singleLine light>
                {label}
            </Typography>
            {children}
        </Row>
    );
};

export default FilterItem;
