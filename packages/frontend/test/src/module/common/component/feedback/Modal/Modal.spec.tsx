import { screen } from "@testing-library/react";
import Modal from "module/common/component/feedback/Modal/Modal";
import { render } from "test-utils";

describe("Modal tests", () => {
    const title = "Modal title";
    const subtitle = "Modal subtitle";
    test("Shows titles", () => {
        render(
            <Modal size="md" title={title} subtitle={subtitle}>
                children
            </Modal>,
        );
        expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByText("children")).toBeInTheDocument();
    });
});
