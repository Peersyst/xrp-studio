import { fireEvent, render, translate } from "test-utils";
import * as Recoil from "recoil";
import BaseGridTags from "module/common/component/layout/BaseGridWithFilters/BaseGridTags/BaseGridTags";

describe("Test for the base grid with tags", () => {
    test("Renders correctly all tags + clear all + button", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([false, jest.fn()]);
        const tags = [
            { label: "Tag1", value: 1 },
            { label: "Tag2", value: 2 },
            { label: "Tag3", value: 3 },
        ];
        const screen = render(<BaseGridTags tags={tags} />);
        expect(screen.getByText("Tag1")).toBeInTheDocument();
        expect(screen.getByText("Tag2")).toBeInTheDocument();
        expect(screen.getByText("Tag3")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("search&Filter") })).toBeInTheDocument();
    });
    test("Triggers clear all button fn", () => {
        const tags = [{ label: "Tag1", value: 1 }];
        const mockedClearAll = jest.fn();
        const screen = render(<BaseGridTags tags={tags} onClear={mockedClearAll} />);
        const btn = screen.getByRole("button", { name: translate("clearAll") });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedClearAll).toHaveBeenCalled();
    });
    test("Triggers tag clicked fn", () => {
        const tags = [{ label: "Tag1", value: 1 }];
        const mockedTagClicked = jest.fn();
        const screen = render(<BaseGridTags tags={tags} onTagClicked={mockedTagClicked} />);
        const btn = screen.getByRole("button", { name: tags[0].label });
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedTagClicked).toHaveBeenCalledWith(tags[0].value);
    });

    test("Renders correctly without tags + triggers button correctly", () => {
        const mockedSetShowFilters = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([false, mockedSetShowFilters]);
        const screen = render(<BaseGridTags />);
        expect(screen.getByText(translate("noneApplied"))).toBeInTheDocument();
        const btn = screen.getByText(translate("search&Filter"));
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
        expect(mockedSetShowFilters).toBeCalledTimes(1);
    });
});
