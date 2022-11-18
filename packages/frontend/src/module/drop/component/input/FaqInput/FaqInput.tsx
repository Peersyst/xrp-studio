import useTranslate from "module/common/hook/useTranslate";
import { FormControl, FormControlLabel, Typography, useFormControl, Row } from "@peersyst/react-components";
import { FaqInputProps } from "./FaqInput.types";
import { DeleteFaqButton, FaqInputTextField, FaqsInputRoot, FaqInputTextAreaField } from "./FaqInput.styles";
import { Faq } from "module/drop/types";

const FaqInput = ({
    defaultValue = { question: "", answer: "" },
    label,
    Label = FormControlLabel,
    LabelProps = {},
    variant,
    size,
    onDelete,
    autoFocus,
    readonly,
    disabled,
    idFaq,
    ...rest
}: FaqInputProps): JSX.Element => {
    const translate = useTranslate();
    const { setFocused } = useFormControl();

    const handleDelete = () => {
        setFocused(false);
        onDelete?.();
    };

    return (
        <FormControl<Faq>
            Label={[Label, LabelProps]}
            label={label}
            defaultValue={defaultValue}
            readonly={readonly}
            disabled={disabled}
            {...rest}
        >
            {(values, setValues) => {
                const handleTitleChange = (question: string) => {
                    setValues({ ...values, question });
                };

                const handleAswerChange = (answer: string) => {
                    setValues({ ...values, answer });
                };

                return (
                    <FaqsInputRoot hasLabel={!!label} className="faqs-input-root">
                        <Row flex={1} style={{ width: "100%", justifyContent: "space-between" }}>
                            <Typography variant="body1" color={"black.70"} fontWeight={500} style={{ lineHeight: "2rem" }}>
                                {`${translate("faqs")} ${idFaq}`}
                            </Typography>
                            {!readonly && onDelete && (
                                <DeleteFaqButton variant={"text"} onClick={handleDelete}>
                                    {`${translate("delete")}`}
                                </DeleteFaqButton>
                            )}
                        </Row>
                        <FaqInputTextField
                            variant={variant}
                            size={size}
                            placeholder={translate("title")}
                            value={values.question}
                            onChange={handleTitleChange}
                            autoFocus={autoFocus}
                            readonly={readonly}
                            disabled={disabled}
                        />
                        <FaqInputTextAreaField
                            placeholder={translate("answer")}
                            value={values.answer}
                            onChange={handleAswerChange}
                            readonly={readonly}
                            disabled={disabled}
                        />
                    </FaqsInputRoot>
                );
            }}
        </FormControl>
    );
};

export default FaqInput;
