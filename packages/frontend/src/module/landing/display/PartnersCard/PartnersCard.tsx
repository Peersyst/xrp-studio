import { LandingPagePartnersProps } from "module/landing/Landing.types";
import { PartnersCardRoot } from "./PartnersCard.styles";
import { Image } from "@peersyst/react-components";
import Link from "module/common/component/navigation/Link/Link";

const PartnersCard = ({ partner }: LandingPagePartnersProps): JSX.Element => {
    return (
        <Link type="href" target="_blank" to={partner?.link}>
            <PartnersCardRoot>
                <Image src={partner?.image} alt={partner.alt} />
            </PartnersCardRoot>
        </Link>
    );
};

export default PartnersCard;
