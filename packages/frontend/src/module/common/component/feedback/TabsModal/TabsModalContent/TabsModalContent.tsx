import { Col } from "@peersyst/react-components";
import clsx from "clsx";

export interface TabsModalContentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

function TabsModalContent({ className, style, children }: TabsModalContentProps): JSX.Element {
    return (
        <Col gap={"2.25rem"} className={clsx("tabs-modal-content", className)} style={style}>
            {children}
        </Col>
    );
}

export default TabsModalContent;
