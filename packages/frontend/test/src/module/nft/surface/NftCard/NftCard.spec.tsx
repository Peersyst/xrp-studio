import { screen } from "@testing-library/react";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { render } from "test-utils";
import img from "../../../../../../src/asset/image/img.png";

describe("NftCard tests", () => {
    test("Renders correctly with note", () => {
        render(<NftCard title={"Contemporany Bird Fifteen"} note={"Okay Birds Contemporany"} loading={false} image={img} to={"/nft/1"} />);
        expect(screen.getByText("Contemporany Bird Fifteen")).toBeInTheDocument();
        expect(screen.getByText("Okay Birds Contemporany")).toBeInTheDocument();
    });
    test("Renders correctly without note", () => {
        render(<NftCard title={"Contemporany Bird Fifteen"} loading={false} image={img} to={"/nft/1"} />);
        expect(screen.getByText("Contemporany Bird Fifteen")).toBeInTheDocument();
    });
});
