import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import ExpandableSelectGroupFilters from "./ExpandableSelectGroupFilters/ExpandableSelectGroupFilters";
import SelectGroup from "../SelectGroup/SelectGroup";
import SearchFilter from "./SearchFilter/SearchFilter";

const Filters = (): JSX.Element => {
    const options = [
        { label: "All", value: "all" },
        { label: "Art", value: "art" },
        { label: "Music", value: "music" },
        { label: "Video", value: "video" },
        { label: "Photography", value: "photography" },
        { label: "Sports", value: "sports" },
    ];
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <SearchFilter />
                <ExpandableSelectGroupFilters options={options} title="Hola caracola" />
                <ExpandableSelectGroupFilters options={options} title="Hola caracola" />
            </Col>
            <FiltersDivider />
            <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                <SelectGroup options={options} selectorLabelProps={{ placement: "left", alignment: "space-between" }} />
            </Col>
        </Col>
    );
};

export default Filters;
