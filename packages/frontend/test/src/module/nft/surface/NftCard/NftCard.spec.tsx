import { screen } from "@testing-library/react";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { render } from "test-utils";

describe("NftCard tests", () => {
    test("Renders correctly", () => {
        render(<NftCard title={"Contemporany Bird Fifteen"} collection={"Okay Birds Contemporany"} loading={false} />);
        expect(screen.getByText("Contemporany Bird Fifteen")).toBeInTheDocument();
        expect(screen.getByText("Okay Birds Contemporany")).toBeInTheDocument();
    });
});
