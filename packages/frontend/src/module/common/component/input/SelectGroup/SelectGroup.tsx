import { Col, FormControl, FormControlLabel, Row } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { SelectGroupProvider, SelectorDirection } from "../CoreSelectGroup";
import { InnerSelectGroupProps, SelectGroupProps } from "./SelectGroup.types";
import { Selector } from "./Selector";

function InnerSelectGroup<T, Multiple extends boolean, D extends SelectorDirection>({
    value,
    setValue,
    disabled,
    direction,
    selectorWrapperProps,
    selectorLabelProps,
    type,
    readonly,
    multiple,
    options,
    children,
}: InnerSelectGroupProps<T, Multiple, D>): JSX.Element {
    const { className, ...restWrapperProps } = selectorWrapperProps;
    const Wrapper = direction === "row" ? Row : Col;
    return (
        <SelectGroupProvider value={{ value, setValue, disabled, multiple, readonly }}>
            <Wrapper {...restWrapperProps} className={cx("SelectorWrapper", className)}>
                {children ||
                    options?.map(({ label, value }, index) => {
                        return <Selector LabelProps={selectorLabelProps} value={value} type={type} label={label} key={index} />;
                    })}
            </Wrapper>
        </SelectGroupProvider>
    );
}

function SelectGroup<T, Multiple extends boolean = false, D extends SelectorDirection = "column">(
    props: SelectGroupProps<T, Multiple, D>,
): JSX.Element {
    //TODO: fer merge de les props useMergeDefaultProps
    const {
        required,
        multiple = false as Multiple,
        defaultValue,
        disabled = false,
        readonly = false,
        children,
        LabelProps = {},
        selectorLabelProps = {},
        Label = FormControlLabel,
        options,
        direction = "column" as D,
        type = "switch",
        className,
        selectorWrapperProps = { gap: "1rem" },
        ...rest
    } = props;
    return (
        <FormControl<Multiple extends true ? T[] : T>
            Label={[Label, LabelProps]}
            className={cx("SelectGroup", className)}
            // @ts-ignore
            defaultValue={defaultValue}
            disabled={disabled}
            readonly={readonly}
            required={required}
            {...rest}
        >
            {(value, setValue) => (
                <InnerSelectGroup<T, Multiple, D>
                    value={value}
                    setValue={setValue}
                    disabled={disabled}
                    direction={direction}
                    selectorLabelProps={selectorLabelProps}
                    selectorWrapperProps={selectorWrapperProps}
                    type={type}
                    readonly={readonly}
                    multiple={multiple}
                    options={options}
                >
                    {children}
                </InnerSelectGroup>
            )}
        </FormControl>
    );
}

export default SelectGroup;
