import { Col, Divider, WithLoading } from "@peersyst/react-components";
import { LandingPageProps } from "module/landing/Landing.types";
import LandingPageArtistsSection from "../LandingPageArtistsSection/LandingPageArtistsSection";
import LandingPageHowWorkSection from "../LandingPageHowWorkSection/LandingPageHowWorkSection";
import LandingPageNftsSection from "../LandingPageNftsSection/LandingPageNftsSection";
import LandingPagePartnersSection from "../LandingPagePartnersSection/LandingPagePartnersSection";
import { useGetTrends } from "../../../query/useGetTrending";
import { how_it_works_create_landing, how_it_works_create_nft, how_it_works_dashboard } from "images";

function LandingPageContent({ ...rest }: WithLoading<LandingPageProps>): JSX.Element {
    const { data: { nfts, artists } = { nfts: [], artists: [] }, isLoading } = useGetTrends();
    // TODO : get How Work
    const items = [
        {
            image: how_it_works_create_nft,
            title: "Create NFTs and manage your digital gallery",
            description:
                "Easily create your collections and NFTs without any XRPL programming knowledge. You can save your pieces as a draft at no cost and work on your collections until they're ready to go!",
        },
        {
            image: how_it_works_create_landing,
            title: "Create awesome landing pages for your drops",
            description:
                "You can customize your themes, sections, and layouts with the visual builder to deliver the best experience to your collectors. Your own landing page for your own collections.",
        },
        {
            image: how_it_works_dashboard,
            title: "Monitor the impact generated by your NFTs",
            description:
                "Once your drops are published or launched, you can easily monitor the impact your art generates every day. Find out how far you can go!",
        },
    ];

    return (
        <Col {...rest}>
            <Col gap={"5.5rem"}>
                <Divider />
                <LandingPageNftsSection nfts={nfts} loading={isLoading} />
                <LandingPageArtistsSection artists={artists} loading={isLoading} />
                <Col>
                    <Divider />
                    <LandingPageHowWorkSection items={items} loading={isLoading} />
                    <Divider />
                </Col>
                <LandingPagePartnersSection />
                <Divider />
            </Col>
        </Col>
    );
}

export default LandingPageContent;
