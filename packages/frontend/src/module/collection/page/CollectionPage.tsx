import BasePage from "module/common/component/layout/BasePage/BasePage";
import CollectionContent from "../component/layout/CollectionContent/CollectionsContent";
import CollectionHeader from "../component/layout/CollectionHeader/CollectionHeader";

const CollectionPage = (): JSX.Element => {
    return (
        <BasePage>
            {{
                header: <CollectionHeader />,
                content: <CollectionContent />,
            }}
        </BasePage>
    );
};

export default CollectionPage;
