import { screen } from "@testing-library/react";
import DropCreationPageContent from "module/drop/page/DropCreationPageContent/DropCreationPageContent";
import { render, translate } from "test-utils";

describe("DropCreationPageContent", () => {
    test("Renders creation", () => {
        render(<DropCreationPageContent collection={undefined} />);

        // Price
        expect(screen.getByPlaceholderText(translate("price"))).toBeInTheDocument();
        // Background Color
        expect(screen.getByText(translate("backgroundColor"))).toBeInTheDocument();
        // Font Color
        expect(screen.getByText(translate("fontColor"))).toBeInTheDocument();
        // Video Trailer Url
        expect(screen.getByPlaceholderText(translate("videoTrailerURL"))).toBeInTheDocument();
        // Instagram
        expect(screen.getByPlaceholderText(translate("instagram"))).toBeInTheDocument();
        // Twitter
        expect(screen.getByPlaceholderText(translate("twitter"))).toBeInTheDocument();
        // Discord
        expect(screen.getByPlaceholderText(translate("discord"))).toBeInTheDocument();
        // Faqs
        expect(screen.getByText(translate("faqs"))).toBeInTheDocument();
    });
});
