import { Animated, Row } from "@peersyst/react-components";
import { CollapsableProps } from "module/common/component/util/Collapsable/Collapsable.types";
import {
    CollapsableBody,
    CollapsableButton,
    CollapsableDivider,
    CollapsableHeader,
    CollapsableRoot,
} from "module/common/component/util/Collapsable/Collapsable.styles";
import { useControlled } from "@peersyst/react-hooks";
import { DownloadIcon, UploadIcon } from "icons";

const Collapsable = ({
    defaultCollapsed = true,
    collapse,
    onChange,
    label,
    collapsedLabel: collapsedLabelProp,
    children,
    ...collapseProps
}: CollapsableProps): JSX.Element => {
    const [collapsed, setCollapsed] = useControlled(defaultCollapsed, collapse, onChange);

    const collapsedLabel = collapsedLabelProp ?? label;

    return (
        <CollapsableRoot>
            <CollapsableHeader>
                <CollapsableDivider />
                <CollapsableButton variant="tertiary" rounded size="sm" onClick={() => setCollapsed(!collapsed)}>
                    <Row gap="0.5rem" alignItems="center">
                        <span css={{ fontSize: "1.25rem", display: "flex" }}>{collapsed ? <UploadIcon /> : <DownloadIcon />}</span>
                        {collapsed ? collapsedLabel : label}
                    </Row>
                </CollapsableButton>
            </CollapsableHeader>
            <Animated.Collapse in={!collapsed} {...collapseProps}>
                <CollapsableBody>{children}</CollapsableBody>
            </Animated.Collapse>
        </CollapsableRoot>
    );
};

export default Collapsable;
