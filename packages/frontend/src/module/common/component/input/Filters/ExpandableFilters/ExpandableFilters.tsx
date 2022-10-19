import { Col, Expandable, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { CurrentValueText, ExpandableFiltersRoot } from "./ExpandableFilters.styles";
import { ExpandableFiltersProps } from "./ExpandableFilters.types";

const ExpandableFilters = ({ title, currentValue, children, className, style }: ExpandableFiltersProps): JSX.Element => {
    return (
        <ExpandableFiltersRoot style={style} className={cx("expandable-filters", className)}>
            <Expandable.Display>
                <Row flex={1} justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <Typography variant="body1" singleLine css={{ maxWidth: "70%" }} light>
                        {title}
                    </Typography>
                    <CurrentValueText variant="body1" singleLine css={{ maxWidth: "25%" }}>
                        {currentValue}
                    </CurrentValueText>
                </Row>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Col flex={1} gap="0.75rem">
                        {children}
                    </Col>
                </Expandable.Content>
            </Expandable.Body>
        </ExpandableFiltersRoot>
    );
};

export default ExpandableFilters;
