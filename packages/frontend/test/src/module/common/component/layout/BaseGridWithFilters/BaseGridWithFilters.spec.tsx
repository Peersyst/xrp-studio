import BaseGridWithFilters from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters";
import { render, translate } from "test-utils";
import Skeletons from "module/common/component/feedback/Skeletons/Skeletons";
import * as Recoil from "recoil";
import { fireEvent } from "@testing-library/dom";

describe("Test for the base grid with filters", () => {
    test("Renders correctly when loaded: children + filters + tags", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);
        const tags = ["Tag1", "Tag2", "Tag3"];
        const screen = render(
            <BaseGridWithFilters
                tags={tags.map((tag, key) => (
                    <p key={key}>{tag}</p>
                ))}
                filters={<>filters</>}
                cols={3}
                colGap={24}
                rowGap={24}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
                data={{
                    pageParams: [],
                    pages: [
                        {
                            currentPage: 1,
                            pages: 2,
                            items: ["a", "b", "c"],
                        },
                        {
                            currentPage: 2,
                            pages: 2,
                            items: ["d", "e", "f"],
                        },
                    ],
                }}
                Skeletons={Skeletons}
                callback={() => undefined}
                loading={false}
                end={false}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGridWithFilters>,
        );
        /**
         * Filters
         */
        expect(screen.getByText(translate("hideFilters&Search"))).toBeInTheDocument();
        expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
        expect(screen.getByText("filters")).toBeInTheDocument();
        /**
         * Content
         */
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
        expect(screen.getByText("c")).toBeInTheDocument();
        expect(screen.getByText("d")).toBeInTheDocument();
        expect(screen.getByText("e")).toBeInTheDocument();
        expect(screen.getByText("f")).toBeInTheDocument();
        /**
         * Tags
         */
        expect(screen.getByText("Tag1")).toBeInTheDocument();
        expect(screen.getByText("Tag2")).toBeInTheDocument();
        expect(screen.getByText("Tag3")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("clearAll") })).toBeInTheDocument();
    });

    test("Renders correctly when has nothing to show + no tags + no Filters", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([false, jest.fn()]);
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([false, jest.fn()]);
        const screen = render(
            <BaseGridWithFilters
                filters={<>filters</>}
                cols={3}
                colGap={24}
                nothingToShow="Nothing to show"
                rowGap={24}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
                data={{
                    pageParams: [],
                    pages: [
                        {
                            currentPage: 1,
                            pages: 1,
                            items: [],
                        },
                    ],
                }}
                Skeletons={Skeletons}
                callback={() => undefined}
                loading={false}
                end={false}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGridWithFilters>,
        );
        //Tags
        expect(screen.getByText(translate("noneApplied"))).toBeInTheDocument();
        expect(screen.getByRole("button", { name: translate("search&Filter") })).toBeInTheDocument();
        //Children
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });

    test("Renders correctly when loading", () => {
        const screen = render(
            <BaseGridWithFilters
                data={{
                    pageParams: [],
                    pages: [
                        {
                            currentPage: 1,
                            pages: 1,
                            items: [],
                        },
                    ],
                }}
                Skeletons={Skeletons}
                callback={() => undefined}
                loading
                cols={3}
                end={false}
                colGap={24}
                rowGap={24}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
                filters={<>filters</>}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGridWithFilters>,
        );
        const grid = screen.getByRole("grid");
        expect(grid.getElementsByClassName("Skeleton").length).toBe(18);
    });

    test("Hide/Show filters", async () => {
        const mockedSetVisibility = jest.fn();
        //Only mock it in the BaseGridWithFilters
        //Do not mock in the BaseGridFilters component that is why the mockImplementationOnce instead of mockImplementation
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, mockedSetVisibility]);
        const screen = render(
            <BaseGridWithFilters
                filters={<>filters</>}
                cols={3}
                colGap={24}
                rowGap={24}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
                data={{
                    pageParams: [],
                    pages: [
                        {
                            currentPage: 1,
                            pages: 1,
                            items: [],
                        },
                    ],
                }}
                Skeletons={Skeletons}
                callback={() => undefined}
                loading={false}
                end={false}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGridWithFilters>,
        );
        //By default filters are shown
        //Filters
        expect(screen.getByText("filters")).toBeInTheDocument();
        const btnIcon = screen.getByTestId("MenuIcon");
        expect(btnIcon).toBeInTheDocument();
        //Hide filters
        fireEvent.click(btnIcon);
        //Displays show filters btn
        expect(screen.getByRole("button", { name: translate("search&Filter") })).toBeInTheDocument();
    });
});