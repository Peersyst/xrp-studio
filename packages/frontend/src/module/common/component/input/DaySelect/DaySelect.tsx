import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import Select from "../Select/Select";
import { SelectProps } from "../Select/Select.types";

export type DaySelectProps = Omit<SelectProps<number>, "options" | "children"> & {
    /**
     * The number of days to display in the select.
     */
    numberOfDays?: number;
};

function DaySelect({ className, numberOfDays = 7, ...rest }: DaySelectProps): JSX.Element {
    const translate = useTranslate();

    return (
        <Select
            expandable={false}
            className={cx("day-select", className)}
            options={Array.from({ length: numberOfDays }, (_, i) => ({ value: i + 1, label: translate("dayCount", { count: i + 1 }) }))}
            {...rest}
        />
    );
}

export default DaySelect;
