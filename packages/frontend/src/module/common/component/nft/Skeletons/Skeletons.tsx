import { Skeleton } from "@peersyst/react-components";
import { SkeletonComponentProps, SkeletonsProps } from "module/common/component/nft/Skeletons/Skeletons.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";

const Skeletons = ({ count, ...rest }: SkeletonsProps): JSX.Element => (
    <>
        {[...Array(count)].map((_, key) => (
            <Skeleton key={key} loading={true} {...rest} />
        ))}
    </>
);

export const BaseCardSkeletons = ({ count }: SkeletonComponentProps): JSX.Element => (
    <>
        {[...Array(count)].map((_, key) => (
            <BaseCard key={key} loading to="" title="loading_title" cover="" />
        ))}
    </>
);

export default Skeletons;
