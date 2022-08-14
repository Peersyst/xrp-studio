import Card from "module/common/component/surface/Card/Card";
import { render } from "test-utils";

describe("Card", () => {
    test("Renders correctly", () => {
        const screen = render(<Card>hola</Card>);
        expect(screen.getByText("hola"));
    });
});
