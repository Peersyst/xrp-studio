import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { Row } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import Button from "module/common/component/input/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import useWallet from "module/wallet/hook/useWallet";

const ProfileCollections = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { address } = useParams<string>();
    const { address: myAddress } = useWallet();
    const translateError = useTranslate("error");
    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];

    return (
        <Row css={{ height: "12rem", width: "100%" }}>
            {collections.length === 0 && !isLoading ? (
                <NothingToShow label={address === myAddress ? translateError("youHaveNoCollections") : translateError("userNoCollections")}>
                    {address === myAddress && (
                        <Button onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)}>{translate("createCollection")}</Button>
                    )}
                </NothingToShow>
            ) : (
                <CollectionCardCarousel collections={collections} loading={isLoading} />
            )}
        </Row>
    );
};

export default ProfileCollections;
