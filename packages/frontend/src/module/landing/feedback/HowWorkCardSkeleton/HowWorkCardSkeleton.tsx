import HowWorkCard from "module/landing/display/HowWorkCard/HowWorkCard";
import { forwardRef } from "react";

const HowWorkCardSkeleton = forwardRef((): JSX.Element => {
    return (
        <HowWorkCard
            loading
            item={{
                image: "image",
                title: "title",
                description: "description",
            }}
        />
    );
});

export default HowWorkCardSkeleton;
