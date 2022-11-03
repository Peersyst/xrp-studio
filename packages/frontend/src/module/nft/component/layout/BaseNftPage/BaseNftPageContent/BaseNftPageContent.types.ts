import { BaseNftPageChildren, BaseNftPageProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import { ReactNode } from "react";

export type BaseNftPageContentProps = Omit<BaseNftPageProps, "children"> & {
    children: BaseNftPageChildren["content"];
};

export interface BaseNftPageSlotProps {
    loading?: boolean;
    children: ReactNode;
}
