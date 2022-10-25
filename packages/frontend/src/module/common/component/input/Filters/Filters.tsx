import { Col } from "@peersyst/react-components";
import { FiltersDivider } from "../../layout/BaseGridWithFilters/BaseGridFilters/BaseGridFilters.styles";
import SearchFilter from "./SearchFilter/SearchFilter";
import { FiltersProvider } from "./FiltersContext";
import { useState } from "react";
import { FiltersProps } from "./Filters.types";
import useTranslate from "module/common/hook/useTranslate";
import ExpandableSelectorGroupFilters from "./ExpandableSelectorGroupFilters/ExpandableSelectorGroupFilters";

const Filters = ({ children }: FiltersProps): JSX.Element => {
    const [value, setValue] = useState({});
    const translate = useTranslate();
    const options = [
        { label: "All", value: "all" },
        { label: "Art", value: "art" },
        { label: "Music", value: "music" },
        { label: "Video", value: "video" },
    ];
    return (
        <FiltersProvider value={{ value, setValue }}>
            <Col gap="1.5rem">
                <Col gap="1rem">
                    <SearchFilter />
                    <ExpandableSelectorGroupFilters type="checkbox" name="xd" options={options} title={translate("Order")} />
                    {children?.header}
                </Col>
                {children?.content && (
                    <>
                        <FiltersDivider />
                        <Col gap="1rem" css={{ padding: "0 0.5rem" }}>
                            {children?.content}
                        </Col>
                    </>
                )}
            </Col>
        </FiltersProvider>
    );
};

export default Filters;
