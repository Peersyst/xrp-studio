import { LabelProps, Skeleton, Typography } from "@peersyst/react-components";
import { DropLandingLabelRoot } from "module/drop/component/display/DropLanding/DropLandingLabel/DropLandingLabel.styles";

export interface DropLandingLabelProps extends LabelProps {
    loading?: boolean;
}

const DropLandingLabel = ({
    variant = "body2",
    gap = "0.375rem",
    children,
    loading = false,
    ...rest
}: DropLandingLabelProps): JSX.Element => (
    <Skeleton loading={loading}>
        <DropLandingLabelRoot variant={variant} gap={gap} {...rest}>
            <Typography variant="h5" fontWeight={500}>
                {loading ? "Loading" : children}
            </Typography>
        </DropLandingLabelRoot>
    </Skeleton>
);

export default DropLandingLabel;
