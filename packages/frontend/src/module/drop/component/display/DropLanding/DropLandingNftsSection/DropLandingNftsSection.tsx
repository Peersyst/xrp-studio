import { DropLandingSection } from "module/drop/component/display/DropLanding/DropLanding.styles";
import { Col, Skeleton, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import NftCardCarousel from "module/nft/component/display/NftCardCarousel/NftCardCarousel";
import { DropLandingNftsSectionProps } from "module/drop/component/display/DropLanding/DropLandingNftsSection/DropLandingNftsSection.types";

const DropLandingNftsSection = ({ nfts = [], loading = false, ...rest }: DropLandingNftsSectionProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <DropLandingSection as={Col} gap="1.5rem" {...rest}>
            <Skeleton loading={loading}>
                <Typography variant="h3" fontWeight={800}>
                    {translate("theNfts")}
                </Typography>
            </Skeleton>
            <NftCardCarousel nfts={nfts} loading={loading} autoplay />
        </DropLandingSection>
    );
};

export default DropLandingNftsSection;
