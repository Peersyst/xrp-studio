import { InformationFieldsProps } from "module/common/component/display/InformationFields/InformationFields.types";
import { Col, Label, Typography } from "@peersyst/react-components";

const InformationFields = ({
    fields,
    className,
    style,
    gap = "1rem",
    labelGap,
    variant = "body1",
    ...labelProps
}: InformationFieldsProps): JSX.Element => (
    <Col gap={gap} className={className} style={style}>
        {fields.map(
            ({ label, content }) =>
                content && (
                    <Label label={label} gap={labelGap} variant={variant} {...labelProps}>
                        <Typography variant={variant}>{content}</Typography>
                    </Label>
                ),
        )}
    </Col>
);

export default InformationFields;
