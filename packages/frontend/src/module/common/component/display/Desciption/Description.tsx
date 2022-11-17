import { Skeleton, Typography } from "@peersyst/react-components";
import { DescriptionProps } from "module/common/component/display/Desciption/Description.types";

const Description = ({ loading, children, ...rest }: DescriptionProps): JSX.Element => {
    if (loading) {
        const widths = ["80%", "65%", "30%"];

        return (
            <>
                {widths.map((width, i) => (
                    <Skeleton width={width} key={i}>
                        <Typography {...rest}>Loading</Typography>
                    </Skeleton>
                ))}
            </>
        );
    } else return <Typography {...rest}>{children}</Typography>;
};

export default Description;
