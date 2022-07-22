import { Skeleton } from "@peersyst/react-components";
import { BaseCardRoot } from "module/common/component/surface/BaseCard/BaseCard.styles";
import { SkeletonComponentProps, SkeletonsProps } from "module/common/component/nft/Skeletons/Skeletons.types";

const Skeletons = ({ count, ...rest }: SkeletonsProps): JSX.Element => (
    <>
        {[...Array(count)].map((_, key) => (
            <Skeleton key={key} loading={true} {...rest} />
        ))}
    </>
);

export const NftSkeletons = ({ count }: SkeletonComponentProps): JSX.Element => (
    <Skeletons count={count}>
        <BaseCardRoot />
    </Skeletons>
);

export default Skeletons;
