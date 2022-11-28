import { Col, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import NftCardCarousel from "module/nft/component/display/NftCardCarousel/NftCardCarousel";
import { LandingPageSectionRoot } from "../LandingPage.styles";
import { LandingPageNftsSectionProps } from "./LandingPageNftsSection.types";

const LandingPageNftsSection = ({ nfts = [], loading = false, ...rest }: LandingPageNftsSectionProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <LandingPageSectionRoot as={Col} gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="h3" fontWeight={800}>
                    {translate("theNfts")}
                </Typography>
            </Skeleton>
            <NftCardCarousel nfts={nfts} loading={loading} autoplay />
        </LandingPageSectionRoot>
    );
};

export default LandingPageNftsSection;
