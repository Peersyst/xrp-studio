import { forwardRef } from "react";
import CollectionCardSkeleton, { CollectionCardSkeletonProps } from "../CollectionCardSkeleton/CollectionCardSkeleton";

const CollectionGridCardSkeleton = forwardRef(
    (props: Omit<CollectionCardSkeletonProps, "gridWidth">, ref): JSX.Element => <CollectionCardSkeleton gridWidth ref={ref} {...props} />,
);

export default CollectionGridCardSkeleton;
