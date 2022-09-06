import { BaseGridTags } from "module/common/component/layout/BaseGridWithFilters/BaseGridTags/BaseGridTags";
import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";

describe("Test for the base grid with tags", () => {
    test("Renders correctly all tags + clear all + button", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([false, jest.fn()]);
        const tags = ["Tag1", "Tag2", "Tag3"];
        const screen = render(
            <BaseGridTags>
                {tags.map((tag, key) => (
                    <p key={key}>{tag}</p>
                ))}
            </BaseGridTags>,
        );
        expect(screen.getByText("Tag1")).toBeInTheDocument();
        expect(screen.getByText("Tag2")).toBeInTheDocument();
        expect(screen.getByText("Tag3")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("search&Filter") })).toBeInTheDocument();
    });
    test("Renders correctly without tags + triggers button correctly", () => {
        const mockedSetShowFilters = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([false, mockedSetShowFilters]);
        const screen = render(<BaseGridTags />);
        screen.getByRole("button", { name: translate("search&Filter") });
        expect(screen.getByText(translate("noneApplied"))).toBeInTheDocument();
        const btn = screen.getByRole("button", { name: translate("search&Filter") });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedSetShowFilters).toBeCalledTimes(1);
    });
});
