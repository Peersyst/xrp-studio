import { SkeletonProps } from "@peersyst/react-components";

export type SkeletonComponentProps = Pick<SkeletonsProps, "count">;

export interface SkeletonsProps extends Omit<SkeletonProps, "loading"> {
    count: number;
}
