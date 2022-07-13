import { screen } from "@testing-library/react";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { render } from "test-utils";
import { NftBackgroundImg } from "module/common/component/surface/NftCard/NftCard.styles";
import img from "../../../../../../src/asset/image/img.png";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        render(
            <NftCard
                title={"Contemporany Bird Fifteen"}
                price={1000}
                cover={<NftBackgroundImg src={img} />}
                collection={"Okay Birds Contemporany"}
            />,
        );

        expect(screen.getByText("Contemporany Bird Fifteen")).toBeInTheDocument();
        expect(screen.getByText("Okay Birds Contemporany")).toBeInTheDocument();
    });

    test("Renders correctly on loading", () => {
        render(
            <NftCard
                title={"Contemporany Bird Fifteen"}
                price={1000}
                cover={<NftBackgroundImg src={img} />}
                collection={"Okay Birds Contemporany"}
            />,
        );

        expect(screen.queryByText("Contemporany Bird Fifteen")).not.toBeInTheDocument();
    });
});
