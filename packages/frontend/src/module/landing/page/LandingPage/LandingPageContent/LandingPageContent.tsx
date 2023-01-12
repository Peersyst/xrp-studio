import { Col, Divider, WithLoading } from "@peersyst/react-components";
import { LandingPageProps } from "module/landing/Landing.types";
import LandingPageArtistsSection from "../LandingPageArtistsSection/LandingPageArtistsSection";
import LandingPageHowWorkSection from "../LandingPageHowWorkSection/LandingPageHowWorkSection";
import LandingPageNftsSection from "../LandingPageNftsSection/LandingPageNftsSection";
import LandingPagePartnersSection from "../LandingPagePartnersSection/LandingPagePartnersSection";
import { useGetTrends } from "module/explore/query/useGetTrending";
import { how_it_works_create_landing, how_it_works_create_nft, how_it_works_dashboard } from "images";
import useTranslate from "module/common/hook/useTranslate";

function LandingPageContent({ ...rest }: WithLoading<LandingPageProps>): JSX.Element {
    const translate = useTranslate();

    const { data: { nfts, artists } = { nfts: [], artists: [] }, isLoading } = useGetTrends();

    const items = [
        {
            image: how_it_works_create_nft,
            title: translate("howItWorksSlide1Title"),
            description: translate("howItWorksSlide1Description"),
        },
        {
            image: how_it_works_create_landing,
            title: translate("howItWorksSlide2Title"),
            description: translate("howItWorksSlide2Description"),
        },
        {
            image: how_it_works_dashboard,
            title: translate("howItWorksSlide3Title"),
            description: translate("howItWorksSlide3Description"),
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
