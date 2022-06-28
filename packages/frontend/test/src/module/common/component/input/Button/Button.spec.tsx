import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "module/common/component/input/Button/Button";
import { render } from "test-utils";

describe("Button " + "tests", () => {
    const title = "HOLA" as const;

    test("Shows text", () => {
        render(<Button onClick={() => "test"}>{title}</Button>);
        expect(screen.getByRole("button", { name: title })).toBeInTheDocument();
    });

    test("Calls function", async () => {
        const mockCallBack = jest.fn();
        render(<Button onClick={mockCallBack}>{title}</Button>);
        userEvent.click(screen.getByRole("button", { name: title }));
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
