import { Row, Col, Typography } from "@peersyst/react-components";
import clsx from "clsx";
import { NftDto } from "module/api/service";
import useTranslate from "module/common/hook/useTranslate";
import NftName from "module/nft/component/display/NftName/NftName";
import UserProfileLink from "module/user/component/navigation/UserProfileLink/UserProfileLink";
import { NftCheckoutImage } from "./NftCheckoutInfo.styles";

export interface NftCheckoutInfoProps {
    className?: string;
    style?: React.CSSProperties;
    nft: NftDto;
}

function NftCheckoutInfo({ className, nft, ...rest }: NftCheckoutInfoProps): JSX.Element {
    const translate = useTranslate();
    const { metadata: { image, name = "" } = {}, user } = nft;

    return (
        <Row className={clsx("nft-checkout", className)} {...rest} gap="2rem" alignItems="center">
            {image && <NftCheckoutImage src={image} alt="nft-image" />}
            <Col gap="0.75rem">
                <Typography variant="body2" fontWeight="400" light>
                    {translate("youAreBuying")}
                </Typography>
                <Col gap="0.125rem" flex={1}>
                    <NftName name={name} variant="h6" fontWeight="800" css={{}} />
                    {user && (
                        <Row gap="0.5rem">
                            <Typography variant="body2" fontWeight="400" light css={{ overflow: "visible" }}>
                                {translate("from") + ": "}
                            </Typography>
                            <UserProfileLink user={user} variant="body2" fontWeight="400" avatar={false} />
                        </Row>
                    )}
                </Col>
            </Col>
        </Row>
    );
}

export default NftCheckoutInfo;
