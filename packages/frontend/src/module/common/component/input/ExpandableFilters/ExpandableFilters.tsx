import { Expandable } from "@peersyst/react-components";

const ExpandableFilters = (): JSX.Element => {
    return (
        <Expandable>
            <Expandable.Display>Jordi Parra</Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <p>Help my daddy</p>
                </Expandable.Content>
            </Expandable.Body>
        </Expandable>
    );
};

export default ExpandableFilters;
