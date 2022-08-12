import Card from "module/common/component/surface/Card/Card";
import { render } from "test-utils";

describe("Test for the card", () => {
    test("Renders correctlu", () => {
        const screen = render(<Card>hola</Card>);
        expect(screen.getByText("hola"));
    });
});
