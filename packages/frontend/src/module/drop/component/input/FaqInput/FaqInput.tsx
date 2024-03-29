import useTranslate from "module/common/hook/useTranslate";
import { FaqInputProps } from "./FaqInput.types";
import { DeleteFaqButton, FaqsInputRoot } from "./FaqInput.styles";
import { Faq } from "module/drop/types";
import TextField from "module/common/component/input/TextField/TextField";
import { config } from "config";
import TextArea from "module/common/component/input/TextArea/TextArea";
import { FormControl, FormControlLabel, Row, Typography, useFormControl } from "@peersyst/react-components";

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
                const handleQuestionChange = (question: string) => {
                    setValues({ ...values, question });
                };

                const handleAnswerChange = (answer: string) => {
                    setValues({ ...values, answer });
                };

                return (
                    <FaqsInputRoot hasLabel={!!label} className="faqs-input-root">
                        <Row flex={1} style={{ width: "100%", justifyContent: "space-between" }}>
                            <Typography variant="body1" color={"black.70"} fontWeight={500} style={{ lineHeight: "2rem" }}>
                                {`${translate("faqs")} ${idFaq}`}
                            </Typography>
                            {onDelete && (!readonly || !disabled) && (
                                <DeleteFaqButton variant={"text"} onClick={handleDelete}>
                                    {translate("delete")}
                                </DeleteFaqButton>
                            )}
                        </Row>
                        <TextField
                            variant={variant}
                            size={size}
                            placeholder={translate("question")}
                            value={values.question}
                            onChange={handleQuestionChange}
                            autoFocus={autoFocus}
                            readonly={readonly}
                            disabled={disabled}
                            validators={{ maxChars: config.maxFaqQuestionChars }}
                        />
                        <TextArea
                            placeholder={translate("answer")}
                            value={values.answer}
                            onChange={handleAnswerChange}
                            readonly={readonly}
                            disabled={disabled}
                            maxLength={config.maxFaqAnswerChars}
                            displayLength
                        />
                    </FaqsInputRoot>
                );
            }}
        </FormControl>
    );
};

export default FaqInput;
