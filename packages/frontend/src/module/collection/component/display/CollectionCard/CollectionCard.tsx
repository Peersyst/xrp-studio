import { WithSkeleton } from "@peersyst/react-components";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";
import { forwardRef } from "react";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import BaseCollectionCard from "../BaseCollectionCard/BaseCollectionCard";

const CollectionCard = forwardRef(
    (
        {
            collection: { id, header = "", image = "", items = 0, name = "" },
            loading = false,
            size = "md",
        }: WithSkeleton<CollectionCardProps>,
        ref,
    ): JSX.Element => {
        const alt = "collection-" + id;
        return (
            <BaseCollectionCard
                loading={loading}
                ref={ref}
                size={size}
                header={header}
                image={image}
                name={name}
                items={items}
                to={CollectionRoutes.VIEW_COLLECTION.replace(":id", id.toString())}
                alt={alt}
            />
        );
    },
);

export default CollectionCard;
