import ExplorePageHeader from "module/explore/component/layout/ExplorePageHeader/ExplorePageHeader";
import ExplorePageContent from "module/explore/component/layout/ExplorePageContent/ExplorePageContent";
import { Tabs } from "@peersyst/react-components";
import useRouteMatch from "module/common/hook/useRouteMatch";
import { BasePageRoot } from "module/common/component/layout/BasePage/BasePage.styles";
import { ExploreRoutes } from "module/explore/ExploreRouter";

const ExplorePage = (): JSX.Element => {
    const path = useRouteMatch([ExploreRoutes.TRENDING, ExploreRoutes.COLLECTIONS, ExploreRoutes.NFTS])?.pattern.path;

    const getIndex = (): number => {
        if (path == ExploreRoutes.NFTS) return 2;
        else if (path === ExploreRoutes.COLLECTIONS) return 1;
        else return 0;
    };

    return (
        <BasePageRoot>
            <Tabs index={getIndex()}>
                <ExplorePageHeader />
                <ExplorePageContent />
            </Tabs>
        </BasePageRoot>
    );
};

export default ExplorePage;
