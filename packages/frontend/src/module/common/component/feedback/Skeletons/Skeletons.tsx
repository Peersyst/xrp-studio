import { Selector, Skeleton, useConfig } from "@peersyst/react-components";
import { SkeletonComponentProps, SkeletonsProps } from "module/common/component/feedback/Skeletons/Skeletons.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";

const Skeletons = ({ count, ...rest }: SkeletonsProps): JSX.Element => (
    <>
        {[...Array(count)].map((_, key) => (
            <Skeleton key={key} loading={true} {...rest} />
        ))}
    </>
);

export const BaseCardSkeletons = ({ count }: SkeletonComponentProps): JSX.Element => {
    const defaultImgUrl = useConfig("nftDefaultCoverUrl");
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <BaseCard key={key} loading to="" title="loading_title" coverUrl={defaultImgUrl} defaultUrl={defaultImgUrl} />
            ))}
        </>
    );
};

export const SelectorSkeletons = ({ count }: SkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <Skeleton loading={true} width="100%" key={key}>
                    <Selector label="Loading selector" value={0} type="switch" />
                </Skeleton>
            ))}
        </>
    );
};

export default Skeletons;
