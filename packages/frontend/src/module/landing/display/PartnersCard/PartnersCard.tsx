import { LandingPagePartnersProps } from "module/landing/Landing.types";
import { PartnersCardRoot } from "./PartnersCard.styles";
import { Image } from "@peersyst/react-components";

const PartnersCard = ({ partner }: LandingPagePartnersProps): JSX.Element => {
    return (
        <PartnersCardRoot>
            <Image src={partner?.image} alt={partner.alt} />
        </PartnersCardRoot>
    );
};

export default PartnersCard;
