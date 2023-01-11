import { forwardRef } from "react";
import NftCard from "module/nft/component/display/NftCard/NftCard";

const NftCardSkeleton = forwardRef((_, ref): JSX.Element => {
    return (
        <NftCard
            ref={ref}
            loading
            nft={{
                id: 0,
                status: "confirmed",
                flags: 0,
                user: { address: "", name: "" },
            }}
            css={{ width: "100%" }}
        />
    );
});

export default NftCardSkeleton;
