import { forwardRef } from "react";
import CollectionCard from "../../display/CollectionCard/CollectionCard";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";

export type CollectionCardSkeleton = Pick<CollectionCardProps, "size">;

const CollectionCardSkeleton = forwardRef((props: CollectionCardSkeleton, ref): JSX.Element => {
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
                    address: "",
                },
            }}
            {...props}
        />
    );
});

export default CollectionCardSkeleton;
