import BackButton from "module/common/component/navigation/BackButton/BackButton";
import { render } from "test-utils";

describe("BackButton test", () => {
    test("Renders correctly", () => {
        const { getByRole } = render(<BackButton />);
        const btn = getByRole("button");
        expect(btn).toBeInTheDocument();
        const icon = btn.getElementsByTagName("svg")[0];
        expect(icon).toHaveAttribute("data-testid", "ChevronLeftIcon");
    });
});
