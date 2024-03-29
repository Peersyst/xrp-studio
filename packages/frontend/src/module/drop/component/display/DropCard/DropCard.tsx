import { DropRoutes } from "module/drop/DropRouter";
import { forwardRef } from "react";
import { DropDto } from "module/api/service";
import { config } from "config";
import { WithSkeleton } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import BaseCollectionCard from "module/collection/component/display/BaseCollectionCard/BaseCollectionCard";
import { BaseCollectionCardProps } from "module/collection/component/display/BaseCollectionCard/BaseCollectionCard.types";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { dropsToXrp } from "xrpl";

export interface DropCardProps extends Pick<BaseCollectionCardProps, "size" | "gridWidth"> {
    drop: DropDto;
}

const DropCard = forwardRef(
    ({ loading = false, size = "md", drop: { items, price, collection }, gridWidth }: WithSkeleton<DropCardProps>, ref): JSX.Element => {
        const translate = useTranslate();
        const formatNumber = useFormatNumber();
        const alt = "drop";
        return (
            <BaseCollectionCard
                loading={loading}
                size={size}
                to={DropRoutes.DROP.replace(":path", collection!.path)}
                header={collection?.header || config.collectionDefaultHeaderUrl}
                alt={alt}
                image={collection?.image || config.collectionDefaultImageUrl}
                name={collection?.name || ""}
                description={`${translate("itemWithCount", { count: items || 0 })} · ${formatNumber(dropsToXrp(price))} XRP/${translate(
                    "mint",
                )}`}
                gridWidth={gridWidth}
                ref={ref}
            />
        );
    },
);

export default DropCard;
