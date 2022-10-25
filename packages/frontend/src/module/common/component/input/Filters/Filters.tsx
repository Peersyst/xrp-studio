import { Col } from "@peersyst/react-components";
import { SelectorOption } from "@peersyst/react-components-core";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import SearchFilter from "./SearchFilter/SearchFilter";
import { BaseFiltersNames, FiltersProps, Order } from "./Filters.types";
import useTranslate from "module/common/hook/useTranslate";
import ExpandableSelectorGroupFilters from "./ExpandableSelectorGroupFilters/ExpandableSelectorGroupFilters";

function Filters({ children: { content, header } }: FiltersProps): JSX.Element {
    const translate = useTranslate();
    const orderOptions: SelectorOption<Order>[] = [
        { label: translate("Latest"), value: "ASC" },
        { label: translate("Oldest"), value: "DESC" },
    ];
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <SearchFilter name={BaseFiltersNames.QUERY} />
                <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                    <ExpandableSelectorGroupFilters<Order>
                        type="checkbox"
                        name={BaseFiltersNames.ORDER}
                        options={orderOptions}
                        title={translate("OrderBy")}
                    />
                    {header}
                </Col>
            </Col>
            {content && (
                <>
                    <FiltersDivider />
                    <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                        {content}
                    </Col>
                </>
            )}
        </Col>
    );
}

export default Filters;
