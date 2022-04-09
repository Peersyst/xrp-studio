import { ReactNode } from "react";
import { Toolbar } from "@peersyst/react-components";

interface BasePageProps {
    toolbarOffset?: boolean;
    children?: ReactNode;
}

const BasePage = ({ toolbarOffset = true, children }: BasePageProps): JSX.Element => (
    <div>
        {toolbarOffset && <Toolbar />}
        <div>{children}</div>
    </div>
);

export default BasePage;
