import { forwardRef } from "react";
import CollectionCard from "../../display/CollectionCard/CollectionCard";

const CollectionCardSkeleton = forwardRef((_, ref): JSX.Element => {
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
        />
    );
});

export default CollectionCardSkeleton;
