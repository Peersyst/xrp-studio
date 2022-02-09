import { ReactNode } from "react";
import Header from "../../navigation/Header/Header";
import Footer from "../../navigation/Footer/Footer";
import { Toolbar } from "@peersyst/react-components";

interface BasePageProps {
    toolbarOffset?: boolean;
    children?: ReactNode;
}

const BasePage = ({ toolbarOffset = true, children }: BasePageProps): JSX.Element => (
    <div>
        <Header />
        {toolbarOffset && <Toolbar />}
        <div>{children}</div>
        <Footer />
    </div>
);

export default BasePage;
