import { screen } from "@testing-library/react";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { render } from "test-utils";
import { NftBackgroundImg } from "module/common/component/surface/NftCard/NftCard.styles";
import img from "../../../../../../src/asset/image/img.png";
import BaseCard from "module/common/component/surface/BaseCard/BaseCard";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        render(
            <BaseCard id={1} type={"nft"} loading={false}>
                <NftCard
                    title={"Contemporany Bird Fifteen"}
                    price={1000}
                    cover={<NftBackgroundImg src={img} />}
                    collection={"Okay Birds Contemporany"}
                />
            </BaseCard>,
        );

        expect(screen.getByText("Contemporany Bird Fifteen")).toBeInTheDocument();
        expect(screen.getByText("Okay Birds Contemporany")).toBeInTheDocument();
    });

    test("Renders correctly on loading", () => {
        render(
            <BaseCard id={1} type={"nft"} loading={true}>
                <NftCard
                    title={"Contemporany Bird Fifteen"}
                    price={1000}
                    cover={<NftBackgroundImg src={img} />}
                    collection={"Okay Birds Contemporany"}
                />
            </BaseCard>,
        );

        expect(screen.queryByText("Contemporany Bird Fifteen")).not.toBeInTheDocument();
    });
});
