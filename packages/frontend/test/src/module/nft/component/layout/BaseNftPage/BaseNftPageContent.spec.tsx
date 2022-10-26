import { screen } from "@testing-library/react";
import { NftsDtoMock } from "test-mocks";
import { render, translate } from "test-utils";
import BaseNftPageContent from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent";
import { BaseNftPageContentLeftSlot } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContentSlots";

describe("BaseNftPageContent", () => {
    test("Renders correctly with default values", () => {
        render(
            <BaseNftPageContent>
                <BaseNftPageContent.Left>
                    <BaseNftPageContentLeftSlot.Image>Image</BaseNftPageContentLeftSlot.Image>
                    <BaseNftPageContentLeftSlot.Info>Info</BaseNftPageContentLeftSlot.Info>
                </BaseNftPageContent.Left>
                <BaseNftPageContent.Right>Right</BaseNftPageContent.Right>
            </BaseNftPageContent>,
        );

        expect(screen.getByText("Image")).toBeInTheDocument();
        expect(screen.getByText("Info")).toBeInTheDocument();
        expect(screen.getByText("Info")).toBeInTheDocument();
    });

    test("Renders correctly with collectionNfts", () => {
        const collectionNftsMock = new NftsDtoMock({ length: 3 }).nfts;

        render(
            <BaseNftPageContent collectionNfts={collectionNftsMock}>
                <></>
            </BaseNftPageContent>,
        );

        // Collection nfts carousel
        expect(screen.getByText(translate("showCollection"))).toBeInTheDocument();
    });
});
