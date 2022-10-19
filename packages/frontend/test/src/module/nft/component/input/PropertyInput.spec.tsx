import { screen } from "@testing-library/react";
import PropertyInput from "module/nft/component/input/PropertyInput/PropertyInput";
import { render, translate } from "test-utils";
import userEvent from "@testing-library/user-event";

describe("PropertyInput", () => {
    test("Renders correctly", () => {
        render(<PropertyInput />);

        const traitTypeInput = screen.getByPlaceholderText(translate("traitType"));
        const valueInput = screen.getByPlaceholderText(translate("value"));

        userEvent.type(traitTypeInput, "color");
        userEvent.type(valueInput, "red");

        expect(screen.getByDisplayValue("color")).toBeInTheDocument();
        expect(screen.getByDisplayValue("red")).toBeInTheDocument();
    });

    test("onDelete", () => {
        const handleDelete = jest.fn();

        render(<PropertyInput onDelete={handleDelete} />);

        const deleteButton = screen.getByTestId("TrashIcon");

        userEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalled();
    });
});
