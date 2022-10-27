import { Col, Skeleton } from "@peersyst/react-components";
import { rack } from "@peersyst/react-utils";
import {
    BaseNftPageContentCard,
    BaseNftPageImageWrapper,
} from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent.styles";
import { Children } from "react";
import { BaseNftPageSlotProps } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent.types";

export const BaseNftPageContentLeftSlot = rack(
    (_, slots): JSX.Element => {
        return (
            <>
                {slots.Image}
                <Col gap="1.5rem" flex={1}>
                    {slots.Info}
                </Col>
            </>
        );
    },
    ["Image", "Info"],
    {
        Image: ({ loading, children }: BaseNftPageSlotProps) => (
            <Skeleton loading={loading} width="100%" style={{ aspectRatio: "1" }}>
                <BaseNftPageImageWrapper>{children}</BaseNftPageImageWrapper>
            </Skeleton>
        ),
        Info: ({ loading, children }: BaseNftPageSlotProps) => (
            <>
                {Children.map(children, (child) => (
                    <Skeleton loading={loading} width="100%">
                        {child}
                    </Skeleton>
                ))}
            </>
        ),
    },
);

export const BaseNftPageContentRightSlot = ({ loading, children }: BaseNftPageSlotProps): JSX.Element => {
    return (
        <Skeleton loading={loading} width="100%">
            <BaseNftPageContentCard>
                <Col gap="1.5rem" flex={1}>
                    {children}
                </Col>
            </BaseNftPageContentCard>
        </Skeleton>
    );
};
