import { InformationFieldsProps } from "module/common/component/display/InformationFields/InformationFields.types";
import { Col, Skeleton } from "@peersyst/react-components";
import { capitalize } from "@peersyst/react-utils";
import { InformationFieldLabel } from "module/common/component/display/InformationFields/InformationFields.styles";

const InformationFields = ({
    fields,
    className,
    style,
    gap = "1rem",
    labelGap,
    variant = "body1",
    loading = false,
    ...labelProps
}: InformationFieldsProps): JSX.Element => (
    <Col gap={gap} className={className} style={style}>
        {fields.map(
            ({ label, content }, i) =>
                content && (
                    <InformationFieldLabel key={label + i} label={capitalize(label)} gap={labelGap} variant={variant} {...labelProps}>
                        <Skeleton loading={loading}>{content}</Skeleton>
                    </InformationFieldLabel>
                ),
        )}
    </Col>
);

export default InformationFields;
