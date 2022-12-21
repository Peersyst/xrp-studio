import { Selector, Skeleton, useConfig } from "@peersyst/react-components";
import { SkeletonComponentProps, SkeletonsProps } from "module/common/component/feedback/Skeletons/Skeletons.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import CollectionCardSkeleton from "module/collection/component/feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import DropFaq from "module/drop/component/display/DropFaq/DropFaq";
import NftsPreviewListItem from "module/nft/component/display/NftsPreviewList/NftsPreviewListItem/NftsPreviewListItem";
import NftCardSkeleton from "module/nft/component/feedback/NftCardSkeleton/NftCardSkeleton";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";

const Skeletons = ({ count, ...rest }: SkeletonsProps): JSX.Element => (
    <>
        {[...Array(count)].map((_, key) => (
            <Skeleton key={key} loading={true} {...rest} />
        ))}
    </>
);

export const BaseCardSkeletons = ({ count }: SkeletonComponentProps): JSX.Element => {
    const defaultImgUrl = useConfig("nftDefaultImageUrl");
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <BaseCard key={key} loading to="" title="loading_title" coverUrl={defaultImgUrl} defaultCoverUrl={defaultImgUrl} />
            ))}
        </>
    );
};

export const CollectionCardSkeletons = ({
    count,
    size = "lg",
}: SkeletonComponentProps & Pick<CollectionCardProps, "size">): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <CollectionCardSkeleton key={key} size={size} />
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

export const DropFaqSkeletons = ({ count }: SkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <DropFaq key={key} loading />
            ))}
        </>
    );
};

export const NftsPreviewListItemSkeletons = ({ count }: SkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <NftsPreviewListItem key={key} loading nft={undefined} />
            ))}
        </>
    );
};

export const NftCardSkeletons = ({ count }: SkeletonsProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <NftCardSkeleton key={key} />
            ))}
        </>
    );
};

export default Skeletons;
