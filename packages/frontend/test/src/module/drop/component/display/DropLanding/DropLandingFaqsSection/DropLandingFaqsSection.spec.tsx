import { screen } from "@testing-library/react";
import DropLandingFaqsSection from "module/drop/component/display/DropLanding/DropLandingFaqsSection/DropLandingFaqsSection";
import { render, translate } from "test-utils";

describe("Drop Landing Faqs Section ", () => {
    test("Renders correctly :", () => {
        render(<DropLandingFaqsSection faqs={[{ answer: "answer", question: "question" }]} loading={false} />);

        // Text
        expect(screen.getByText(translate("FAQs"))).toBeInTheDocument();
        // Content
        expect(screen.getByText("answer")).toBeInTheDocument();
        expect(screen.getByText("question")).toBeInTheDocument();
    });

    test("Renders correctly without faqs", () => {
        render(<DropLandingFaqsSection faqs={[]} loading={false} />);

        // Text
        expect(screen.getByText(translate("FAQs"))).toBeInTheDocument();
        // Content
        expect(screen.queryByText("answer")).not.toBeInTheDocument();
        expect(screen.queryByText("question")).not.toBeInTheDocument();
    });
});
