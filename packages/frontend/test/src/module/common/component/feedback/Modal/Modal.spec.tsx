import { screen } from "@testing-library/react";
import Modal from "module/common/component/feedback/Modal/Modal";
import { render } from "test-utils";

describe("Modal tests", () => {
    const title = "Modal title";
    const subtitle = "Modal subtitle";
    test("Shows titles", () => {
        render(
            <Modal open={true} onClose={() => false} title={title} subtitle={subtitle}>
                children
            </Modal>,
        );
        expect(screen.getByRole("button", { name: title })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: subtitle })).toBeInTheDocument();
        expect(screen.getByText("children")).toBeInTheDocument();
    });
});
