import { forwardRef, JSXElementConstructor } from "react";
import DropCard, { DropCardProps } from "../../display/DropCard/DropCard";

export type DropCardSkeletonProps = Pick<DropCardProps, "size" | "gridWidth">;

const DropCardSkeleton = forwardRef((props: DropCardSkeletonProps, ref): JSX.Element => {
    return (
        <DropCard
            ref={ref}
            loading
            drop={{
                id: 0,
                items: 0,
                soldItems: 0,
                price: "0",
                backgroundColor: "#000000",
                fontColor: "#FFFFFF",
                collection: {
                    name: "Drop name loading",
                    id: 0,
                    taxon: 0,
                    items: 0,
                    user: {
                        name: "",
                        address: "",
                    },
                    account: "",
                    path: "",
                },
            }}
            {...props}
        />
    );
});

export function createDropCardSkeleton(props: DropCardSkeletonProps): JSXElementConstructor<{}> {
    return () => <DropCardSkeleton {...props} />;
}

export default DropCardSkeleton;
