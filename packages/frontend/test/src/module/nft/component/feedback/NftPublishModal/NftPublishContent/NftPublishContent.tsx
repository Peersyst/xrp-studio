import PublishContent from "module/nft/component/feedback/NftPublishModal/PublishContent/PublishContent";
import { render } from "test-utils";
import { screen } from "@testing-library/react";

describe("NftPublishContent tests", () => {
    const COVER = "image";

    test("Renders correctly with cover", () => {
        render(<PublishContent cover={COVER} />);

        expect(screen.getByRole("img")).toHaveAttribute("src", COVER);
    });

    test("Renders correctly without cover", () => {
        render(<PublishContent />);

        expect(screen.getByRole("img")).toHaveAttribute("src", "");
    });
});
