import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";

const ProfileCollections = (): JSX.Element => {
    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];
    return collections.length === 0 && !isLoading ? <></> : <CollectionCardCarousel collections={collections} isLoading={isLoading} />;
};

export default ProfileCollections;
