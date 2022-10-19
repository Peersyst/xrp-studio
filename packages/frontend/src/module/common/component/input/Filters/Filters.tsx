import { Checkbox, Col, RadioButton, SelectItem, Switch, useTheme } from "@peersyst/react-components";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import ExpandableFilters from "./ExpandableFilters/ExpandableFilters";
import SearchBar from "../SearchBar/SearchBar";
import { useMediaQuery } from "@peersyst/react-hooks";
import FilterItem from "./FilterItem/FilterItem";
import Select from "../Select/Select";

const Filters = (): JSX.Element => {
    const {
        breakpoints: {
            values: { nftsGrid },
        },
    } = useTheme();
    const isTablet = useMediaQuery(`(max-width: ${nftsGrid.sm}px)`);
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <SearchBar variant={isTablet ? "filled" : "cardfilled"} />
                <ExpandableFilters title="Order by" currentValue="All">
                    {[
                        <FilterItem label="Newest">
                            <RadioButton
                                css={{
                                    [".RadioButton"]: { color: "#5E676E", fontSize: "1rem" },
                                    [".Checked"]: { opacity: "0.75", color: "#008CFF" },
                                }}
                            />
                        </FilterItem>,
                        <FilterItem label="Latest">
                            <RadioButton
                                css={{
                                    [".RadioButton"]: { color: "#5E676E", fontSize: "1rem" },
                                    [".Checked"]: { opacity: "0.75", color: "#008CFF" },
                                }}
                            />
                        </FilterItem>,
                    ]}
                </ExpandableFilters>
                <ExpandableFilters title="Order by" currentValue="All">
                    {[
                        <Select
                            defaultValue={"1"}
                            placeholder="Order by"
                            css={{
                                [".SelectDisplay"]: { padding: "0.5rem", border: "none" },
                                [".SelectMenu"]: { background: "transparent", boxShadow: "unset", border: "0" },
                            }}
                        >
                            <SelectItem value="1">Latest</SelectItem>
                            <SelectItem value="2">Oldest</SelectItem>
                        </Select>,
                    ]}
                </ExpandableFilters>
            </Col>
            <FiltersDivider />
            <Col>
                <FilterItem label="Filter by">
                    <Switch />
                </FilterItem>
            </Col>
        </Col>
    );
};

export default Filters;
