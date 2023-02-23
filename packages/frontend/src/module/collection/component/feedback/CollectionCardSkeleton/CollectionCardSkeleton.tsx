import { forwardRef } from "react";
import CollectionCard from "../../display/CollectionCard/CollectionCard";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";

export type CollectionCardSkeletonProps = Pick<CollectionCardProps, "size" | "gridWidth">;

const CollectionCardSkeleton = forwardRef((props: CollectionCardSkeletonProps, ref): JSX.Element => {
    return (
        <CollectionCard
            ref={ref}
            loading
            collection={{
                name: "collection name loading",
                id: 0,
                taxon: 0,
                items: 0,
                user: {
                    name: "",
                    address: "",
                },
                account: "",
                path: "",
            }}
            {...props}
        />
    );
});

export default CollectionCardSkeleton;
