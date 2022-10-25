import { Col } from "@peersyst/react-components";
import { SelectorOption } from "@peersyst/react-components-core";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import SearchFilter from "./SearchFilter/SearchFilter";
import { BaseFiltersNames, FiltersProps, Order } from "./Filters.types";
import useTranslate from "module/common/hook/useTranslate";
import ExpandableSelectorGroupFilters from "./ExpandableSelectorGroupFilters/ExpandableSelectorGroupFilters";

function Filters({ children }: FiltersProps): JSX.Element {
    const translate = useTranslate();
    const orderOptions: SelectorOption<Order>[] = [
        { label: translate("Oldest"), value: "DESC" },
        { label: translate("Latest"), value: "ASC" },
    ];
    return (
        <Col gap="1.5rem">
            <Col gap="1rem">
                <SearchFilter name={BaseFiltersNames.QUERY} />
                <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                    <ExpandableSelectorGroupFilters<Order, BaseFiltersNames.ORDER>
                        name={BaseFiltersNames.ORDER}
                        options={orderOptions}
                        title={translate("OrderBy")}
                        defaultValue={orderOptions[0].value}
                    />
                    {children?.header}
                </Col>
            </Col>
            {children?.content && (
                <>
                    <FiltersDivider />
                    <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                        {children.content}
                    </Col>
                </>
            )}
        </Col>
    );
}

export default Filters;
