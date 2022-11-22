import { Expandable, Selector, Skeleton, Typography, useConfig } from "@peersyst/react-components";
import { SkeletonComponentProps, SkeletonsProps } from "module/common/component/feedback/Skeletons/Skeletons.types";
import BaseCard from "module/nft/component/surface/BaseCard/BaseCard";
import CollectionCardSkeleton from "module/collection/component/feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import useTranslate from "module/common/hook/useTranslate";

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
                <BaseCard key={key} loading to="" title="loading_title" coverUrl={defaultImgUrl} defaultCoverUrl={defaultImgUrl} />
            ))}
        </>
    );
};

export const LgCollectionCardSkeletons = ({ count }: SkeletonComponentProps): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <CollectionCardSkeleton key={key} size="lg" />
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

export const DropFaqSkeleton = ({ count }: SkeletonsProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <>
            {[...Array(count)].map((_, key) => (
                <Expandable key={key} open={true}>
                    <Expandable.Display>
                        <Skeleton loading={true} width="100%">
                            <Typography variant="h5" fontWeight={500}>
                                {translate("faqs")}
                            </Typography>
                        </Skeleton>
                    </Expandable.Display>
                    <Expandable.Body>
                        <Expandable.Content>
                            <Skeleton loading={true} width="100%">
                                <Typography variant="body2" light fontWeight={500}>
                                    {translate("faqs")}
                                </Typography>
                            </Skeleton>
                        </Expandable.Content>
                    </Expandable.Body>
                </Expandable>
            ))}
        </>
    );
};

export default Skeletons;
