import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { render } from "test-utils";

describe("Test for skeletons", () => {
    test("Renders basecard skeleton correctly", () => {
        const count = 5;
        const { getAllByRole } = render(<BaseCardSkeletons count={count} />);
        expect(getAllByRole("heading", { name: "loading_title" })).toHaveLength(count);
    });
});
