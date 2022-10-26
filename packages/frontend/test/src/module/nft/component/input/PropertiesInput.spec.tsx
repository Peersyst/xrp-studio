import { screen } from "@testing-library/react";
import { render, translate } from "test-utils";
import PropertiesInput from "module/nft/component/input/PropertiesInput/PropertiesInput";
import userEvent from "@testing-library/user-event";

describe("PropertiesInput", () => {
    test("Renders correctly", () => {
        render(<PropertiesInput />);

        const addPropertyButton = screen.getByText(translate("addProperty"));

        userEvent.click(addPropertyButton);

        expect(screen.getByPlaceholderText(translate("traitType"))).toBeInTheDocument();
        expect(screen.getByPlaceholderText(translate("value"))).toBeInTheDocument();
    });

    test("Deletes properties correctly", () => {
        const NUMBER_OF_PROPERTIES = 3;

        render(<PropertiesInput />);

        const addPropertyButton = screen.getByText(translate("addProperty"));

        for (let i = 0; i < NUMBER_OF_PROPERTIES; i++) userEvent.click(addPropertyButton);

        const traitTypeInputs = screen.getAllByPlaceholderText(translate("traitType"));
        const valueInputs = screen.getAllByPlaceholderText(translate("value"));

        for (let i = 0; i < NUMBER_OF_PROPERTIES; i++) {
            userEvent.type(traitTypeInputs[i], "Trait type " + i);
            userEvent.type(valueInputs[i], "Value " + i);
        }

        for (let i = 0; i < NUMBER_OF_PROPERTIES; i++) {
            const deleteFirstPropertyButton = screen.getAllByTestId("TrashIcon")[0];
            userEvent.click(deleteFirstPropertyButton);

            expect(screen.queryByDisplayValue("Trait type " + i)).toBeNull();
            expect(screen.queryByDisplayValue("Value " + i)).toBeNull();

            for (let j = i + 1; j < NUMBER_OF_PROPERTIES; j++) {
                expect(screen.getByDisplayValue("Trait type " + j)).toBeInTheDocument();
                expect(screen.getByDisplayValue("Value " + j)).toBeInTheDocument();
            }
        }
    });

    test("Renders readonly correctly", () => {
        render(<PropertiesInput readonly />);

        expect(screen.queryByText(translate("addProperty"))).toBeNull();
    });
});
