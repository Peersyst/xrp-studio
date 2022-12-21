import ArtistCard from "module/landing/display/ArtistCard/ArtistCard";
import { forwardRef } from "react";

const ArtistCardSkeleton = forwardRef((_, ref): JSX.Element => {
    return (
        <ArtistCard
            ref={ref}
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
