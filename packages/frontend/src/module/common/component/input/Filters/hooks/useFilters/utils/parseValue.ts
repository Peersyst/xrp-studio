import { Filter } from "module/common/component/input/Filters/hooks/useFilters";
import parseTypedValue from "module/common/component/input/Filters/hooks/useFilters/utils/parseTypedValue";

export default function <T>(value: string, filter: Filter<T>): T {
    if ("type" in filter) return parseTypedValue(value, filter.type as any);
    else return filter.parser(value);
}
