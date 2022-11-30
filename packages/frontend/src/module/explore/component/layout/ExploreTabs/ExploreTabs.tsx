import { Link } from "react-router-dom";
import { ResourceType } from "locale/i18n.types";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import useTranslate from "module/common/hook/useTranslate";
import { Row, Typography } from "@peersyst/react-components";
import { ExploreTab } from "module/explore/component/layout/ExploreTab/ExploreTab.styles";

interface ExploreTabContent {
    path: string;
    selected: boolean;
    label: keyof ResourceType["translation"];
}

const ExploreTabs = (): JSX.Element => {
    const translate = useTranslate();

    const EXPLORE_TABS: ExploreTabContent[] = [
        {
            path: ExploreRoutes.TRENDING,
            selected: location.pathname === ExploreRoutes.TRENDING || location.pathname === ExploreRoutes.MAIN,
            label: "trending",
        },
        {
            path: ExploreRoutes.COLLECTIONS,
            selected: location.pathname === ExploreRoutes.COLLECTIONS,
            label: "collections",
        },
        {
            path: ExploreRoutes.NFTS,
            selected: location.pathname === ExploreRoutes.NFTS,
            label: "nfts",
        },
    ];

    return (
        <Row gap="1.5rem">
            {EXPLORE_TABS.map(({ path, selected, label }, index) => (
                <Link key={index} to={path}>
                    <ExploreTab index={0} selected={selected}>
                        <Typography variant="body1">{translate(label)}</Typography>
                    </ExploreTab>
                </Link>
            ))}
        </Row>
    );
};

export default ExploreTabs;
