import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { Row } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import Button from "module/common/component/input/Button/Button";
import { Link } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";

const ProfileCollections = (): JSX.Element => {
    const translate = useTranslate();

    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];

    return (
        <Row css={{ height: "12rem", width: "100%" }}>
            {collections.length === 0 && !isLoading ? (
                <NothingToShow label={translate("youHaveNoCollections")}>
                    <Link to={CollectionRoutes.CREATE_COLLECTION}>
                        <Button>{translate("createCollection")}</Button>
                    </Link>
                </NothingToShow>
            ) : (
                <CollectionCardCarousel collections={collections} isLoading={isLoading} />
            )}
        </Row>
    );
};

export default ProfileCollections;
