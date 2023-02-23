import { forwardRef } from "react";
import DropCardSkeleton, { DropCardSkeletonProps } from "../DropCardSkeleton/DropCardSkeleton";

const DropGridCardSkeleton = forwardRef(
    (props: Omit<DropCardSkeletonProps, "gridWidth">, ref): JSX.Element => <DropCardSkeleton gridWidth ref={ref} {...props} />,
);

export default DropGridCardSkeleton;
