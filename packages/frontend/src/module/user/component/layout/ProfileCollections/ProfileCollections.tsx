import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";

const ProfileCollections = (): JSX.Element => {
    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];
    const coll2 = [...Array(10)].map((_, i) => ({
        ...{
            id: 0,
            taxon: 0,
            name: "Moonbirds",
            description:
                "A collection of 10,000 utility-enabled PFPs that feature a richly diverse and unique pool of rarity-powered traits. What's more, each Moonbird unlocks private club membership and additional benefits the longer you hold them. We call it nesting – because, obviously.",
            image: "https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s168",
            header: "https://lh3.googleusercontent.com/ouzjfA0LotbHC92vuDph9JDeg7Z4ZFo12Pr9GJpfSAZSrnXDOubJn0eTvinwzUTPsWhnLLq5ocjcDSrpNV0_MYIjueVJrzFlE6p0=h600",
            items: 0,
            user: {
                address: "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC",
                name: "amillan",
                description: undefined,
                image: "https://avatars.githubusercontent.com/u/74896585?v=4",
                header: undefined,
                twitter: undefined,
                discord: undefined,
            },
        },
        id: i,
    }));
    console.log(coll2[0]);
    return collections.length === 0 && !isLoading ? <></> : <CollectionCardCarousel collections={coll2} isLoading={isLoading} />;
};

export default ProfileCollections;
