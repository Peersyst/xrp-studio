import { WithSkeleton } from "@peersyst/react-components";
import { CollectionCardProps } from "module/collection/component/display/CollectionCard/CollectionCard.types";
import { forwardRef } from "react";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import BaseCollectionCard from "../BaseCollectionCard/BaseCollectionCard";
import useTranslate from "module/common/hook/useTranslate";

const CollectionCard = forwardRef(
    (
        {
            collection: { header = "", image = "", items = 0, name, path },
            loading = false,
            size = "md",
            gridWidth,
        }: WithSkeleton<CollectionCardProps>,
        ref,
    ): JSX.Element => {
        const translate = useTranslate();
        return (
            <BaseCollectionCard
                loading={loading}
                ref={ref}
                size={size}
                header={header}
                image={image}
                name={name}
                namePlaceholder={translate("unnamed")}
                description={translate("itemWithCount", { count: items || 0 })}
                to={CollectionRoutes.VIEW_COLLECTION.replace(":path", path.toString())}
                alt={path}
                gridWidth={gridWidth}
            />
        );
    },
);

export default CollectionCard;
