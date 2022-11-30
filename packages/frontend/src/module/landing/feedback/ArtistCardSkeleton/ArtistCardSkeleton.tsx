import ArtistCard from "module/landing/display/ArtistCard/ArtistCard";
import { forwardRef } from "react";

const ArtistCardSkeleton = forwardRef((): JSX.Element => {
    return (
        <ArtistCard
            loading
            artist={{
                image: "image",
                name: "name",
                address: "address",
            }}
        />
    );
});

export default ArtistCardSkeleton;
