import { Row } from "@peersyst/react-components";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";

const MyNftsPageHeaderFooter = (): JSX.Element => {
    return (
        <Row>
            <SearchBar css={{ width: "20rem" }} />
        </Row>
    );
};

export default MyNftsPageHeaderFooter;
