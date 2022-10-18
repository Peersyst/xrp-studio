import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";
import SearchBar from "../SearchBar/SearchBar";
import SwitchFilter from "../SwitchFilter/SwitchFilter";

const Filters = (): JSX.Element => {
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <SearchBar />
                <ExpandableFilters />
            </Col>
            <FiltersDivider />
            <Col>
                <SwitchFilter />
            </Col>
        </Col>
    );
};

export default Filters;
