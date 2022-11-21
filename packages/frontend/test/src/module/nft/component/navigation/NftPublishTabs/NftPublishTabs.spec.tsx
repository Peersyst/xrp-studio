import { render, translate } from "test-utils";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs/NftPublishTabs";
import { screen } from "@testing-library/react";

describe("NftPublishTabs tests", () => {
    test("Renders correctly summary tab (0)", () => {
        render(<NftPublishTabs tab={0} />);

        expect(screen.getByRole("heading", { name: translate("noDataProvided") })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: translate("creationSteps") })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: translate("successTitle") })).not.toBeInTheDocument();
    });

    test("Renders correctly transaction tab (1)", () => {
        render(<NftPublishTabs tab={1} />);

        expect(screen.queryByRole("heading", { name: translate("noDataProvided") })).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("creationSteps") + ":" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: translate("successTitle") + ":" })).not.toBeInTheDocument();
    });
    test("Renders correctly success tab (2)", () => {
        render(<NftPublishTabs tab={2} />);

        expect(screen.queryByRole("heading", { name: translate("noDataProvided") })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: translate("creationSteps") + ":" })).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: translate("successTitle") })).toBeInTheDocument();
    });
});
