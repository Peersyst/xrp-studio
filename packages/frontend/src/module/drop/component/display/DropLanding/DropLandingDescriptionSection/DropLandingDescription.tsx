import { Skeleton, Typography } from "@peersyst/react-components";

export interface DropLandingDescriptionProps {
    description: string | undefined;
    loading?: boolean;
}

const LoadingDescriptionTypography = (): JSX.Element => (
    <Typography variant="body2" css={{ lineHeight: "1.5rem" }}>
        "Loading"
    </Typography>
);

const DropLandingDescription = ({ description, loading }: DropLandingDescriptionProps): JSX.Element => {
    return loading ? (
        <>
            <Skeleton width="80%">
                <LoadingDescriptionTypography />
            </Skeleton>
            <Skeleton width="65%">
                <LoadingDescriptionTypography />
            </Skeleton>
            <Skeleton width="30%">
                <LoadingDescriptionTypography />
            </Skeleton>
        </>
    ) : (
        <Typography variant="body2" css={{ opacity: 0.72, lineHeight: "1.5rem" }}>
            {description}
        </Typography>
    );
};
export default DropLandingDescription;
