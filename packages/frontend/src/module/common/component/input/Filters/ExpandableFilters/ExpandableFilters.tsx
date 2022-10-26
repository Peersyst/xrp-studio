import { Col, Expandable, Loader, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import useTranslate from "module/common/hook/useTranslate";
import { CurrentValueText, ExpandableFiltersRoot } from "./ExpandableFilters.styles";
import { ExpandableFiltersProps } from "./ExpandableFilters.types";

const ExpandableFilters = ({
    title,
    currentValue,
    loadingText,
    children,
    className,
    loading,
    ...rest
}: ExpandableFiltersProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <ExpandableFiltersRoot {...rest} className={cx("expandable-filters", className)}>
            <Expandable.Display>
                <Row flex={1} justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <Typography variant="body1" singleLine css={{ maxWidth: "60%" }} light>
                        {title}
                    </Typography>
                    {loading ? (
                        <Loader style={{ fontSize: "1rem" }} />
                    ) : (
                        <CurrentValueText variant="body1" singleLine css={{ maxWidth: "35%" }} textAlign="end">
                            {currentValue}
                        </CurrentValueText>
                    )}
                </Row>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Col flex={1} gap="0.75rem">
                        {loading ? (
                            <Typography variant="body2" textAlign="center" light>
                                {loadingText || translate("loadingFilters")}
                            </Typography>
                        ) : (
                            children
                        )}
                    </Col>
                </Expandable.Content>
            </Expandable.Body>
        </ExpandableFiltersRoot>
    );
};

export default ExpandableFilters;
