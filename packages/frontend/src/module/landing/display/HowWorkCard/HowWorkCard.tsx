import { Skeleton, Typography, WithLoading } from "@peersyst/react-components";
import { LandingPageItemProps } from "module/landing/Landing.types";
import { forwardRef } from "react";
import { BaseDescription, BaseImage, HowWorkCardRoot } from "./HowWorkCard.styles";

const HowWorkCard = forwardRef(({ item, loading = false }: WithLoading<LandingPageItemProps>, ref): JSX.Element => {
    const { title = "Loading title", image, description = "Loading description" } = item || {};
    return (
        <HowWorkCardRoot gap="2rem" alignItems="center" flex={1} ref={ref}>
            <BaseImage src={image!} alt={title} loading={loading} />
            <Skeleton loading={loading}>
                <Typography variant="h5" fontWeight={800}>
                    {title}
                </Typography>
            </Skeleton>
            <Skeleton loading={loading}>
                <BaseDescription variant="body1" light>
                    {description}
                </BaseDescription>
            </Skeleton>
        </HowWorkCardRoot>
    );
});

export default HowWorkCard;
