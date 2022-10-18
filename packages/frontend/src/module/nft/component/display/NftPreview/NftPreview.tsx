import { NftPreviewProps } from "module/nft/component/display/NftPreview/NftPreview.types";
import { Col, Skeleton, Typography } from "@peersyst/react-components";
import { NftPreviewImage } from "module/nft/component/display/NftPreview/NftPreview.styles";
import { forwardRef } from "react";
import ConditionalLink from "module/common/component/navigation/ConditionalLink/ConditionalLink";

const NftPreview = forwardRef(({ nft, loading = false, to, ...rest }: NftPreviewProps, ref): JSX.Element => {
    const { metadata: { image = "", name = "" } = {} } = nft || {};

    return (
        <ConditionalLink condition={!!to} to={to || ""}>
            <Col gap="0.75rem" ref={ref} {...rest}>
                <NftPreviewImage src={image} alt={`${name}-preview-img`} loading={loading} />
                <Skeleton loading={loading}>
                    <Typography variant="body2" light>
                        {loading ? "loading name" : name}
                    </Typography>
                </Skeleton>
            </Col>
        </ConditionalLink>
    );
});

export default NftPreview;
