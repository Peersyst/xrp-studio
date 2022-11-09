import { Col, Expandable, Loader, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { SelectorSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import useTranslate from "module/common/hook/useTranslate";
import { ExpandableFilterRoot } from "./ExpandableFilter.styles";
import { ExpandableFilterProps } from "./ExpandableFilter.types";

const ExpandableFilter = ({
    title,
    currentValue,
    children,
    className,
    loadingText,
    loading,
    ...rest
}: ExpandableFilterProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <ExpandableFilterRoot {...rest} className={cx("expandable-filters", className)}>
            <Expandable.Display>
                <Row flex={1} justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <Typography variant="body1" singleLine css={{ maxWidth: "60%" }} light>
                        {loading ? loadingText || translate("loadingFilters") : title}
                    </Typography>
                    {loading ? (
                        <Loader style={{ fontSize: "1rem" }} />
                    ) : (
                        <Typography color="gray.60" variant="body1" singleLine css={{ maxWidth: "35%" }} textAlign="end">
                            {currentValue}
                        </Typography>
                    )}
                </Row>
            </Expandable.Display>
            <Expandable.Body>
                <Expandable.Content>
                    <Col flex={1} gap="0.75rem">
                        {loading ? <SelectorSkeletons count={3} /> : children}
                    </Col>
                </Expandable.Content>
            </Expandable.Body>
        </ExpandableFilterRoot>
    );
};

export default ExpandableFilter;
