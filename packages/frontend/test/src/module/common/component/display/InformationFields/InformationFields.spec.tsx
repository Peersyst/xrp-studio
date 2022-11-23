import { screen } from "@testing-library/react";
import { InformationField } from "module/common/component/display/InformationFields/InformationFields.types";
import { render } from "test-utils";
import InformationFields from "module/common/component/display/InformationFields/InformationFields";
import { capitalize } from "@peersyst/react-utils";

describe("InformationFields", () => {
    test("Renders correctly", () => {
        const fields: InformationField[] = [
            {
                label: "label1",
                content: "content1",
            },
            {
                label: "label2",
                content: undefined,
            },
            {
                label: "label3",
                content: "content3",
            },
        ];

        render(<InformationFields fields={fields} />);

        expect(screen.getByText(capitalize(fields[0].label)));
        expect(screen.getByText(fields[0].content as string));

        expect(screen.queryByText(capitalize(fields[1].label))).toBeNull();

        expect(screen.getByText(capitalize(fields[2].label)));
        expect(screen.getByText(fields[2].content as string));
    });
});
