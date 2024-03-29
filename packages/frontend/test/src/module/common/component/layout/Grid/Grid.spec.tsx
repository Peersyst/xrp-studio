import Grid from "module/common/component/layout/Grid/Grid";
import { render, translate } from "test-utils";
import Skeletons from "module/common/component/feedback/Skeletons/Skeletons";
import * as Recoil from "recoil";

describe("Test for the Grid component", () => {
    /**
     * Tests for the Grid component without filters
     */
    test("Renders correctly when not loading", () => {
        const screen = render(
            <Grid
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
            </Grid>,
        );

        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
        expect(screen.getByText("c")).toBeInTheDocument();
        expect(screen.getByText("d")).toBeInTheDocument();
        expect(screen.getByText("e")).toBeInTheDocument();
        expect(screen.getByText("f")).toBeInTheDocument();
    });

    test("Renders correctly when has nothing to show", () => {
        const screen = render(
            <Grid
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
                nothingToShow="Nothing to show"
                end={false}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </Grid>,
        );

        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });

    test("Renders correctly when loading", () => {
        const screen = render(
            <Grid data={undefined} Skeletons={Skeletons} callback={() => undefined} loading end={false}>
                {(letters) => letters.map((letter, key) => <p key={key}>{letter as any}</p>)}
            </Grid>,
        );

        const grid = screen.getByRole("grid");
        expect(grid.getElementsByClassName("Skeleton").length).toBe(6);
    });

    /**
     * Tests for the Grid component with filters
     */
    test("Renders correctly when loaded: children + filters + tags (with filters)", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, jest.fn()]);

        const tags = [
            { label: "Tag1", value: 1 },
            { label: "Tag2", value: 2 },
            { label: "Tag3", value: 3 },
        ];
        const screen = render(
            <Grid
                withFilters
                tags={tags}
                filters={{ content: <>filters</> }}
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
            </Grid>,
        );
        /**
         * Filters
         */
        expect(screen.getByText(translate("showFilters"))).toBeInTheDocument();
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

    test("Renders correctly when has nothing to show + no tags + no Filters (with filters)", () => {
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([false, jest.fn()]);
        const screen = render(
            <Grid
                filters={{ content: <>filters</> }}
                cols={3}
                colGap={24}
                withFilters
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
            </Grid>,
        );
        expect(screen.getByRole("button", { name: translate("showFilters") })).toBeInTheDocument();
        //Children
        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });

    test("Renders correctly when loading", () => {
        const screen = render(
            <Grid
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
                filters={{ content: <>filters</> }}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </Grid>,
        );
        const grid = screen.getByRole("grid");
        expect(grid.getElementsByClassName("Skeleton").length).toBe(6);
    });

    test("Hide/Show filters (with filters)", async () => {
        const mockedSetVisibility = jest.fn();
        //Only mock it in the Grid
        //Do not mock in the BaseGridFilters component that is why the mockImplementationOnce instead of mockImplementation
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, mockedSetVisibility]);
        jest.spyOn(Recoil, "useRecoilState").mockReturnValueOnce([true, mockedSetVisibility]);
        const screen = render(
            <Grid
                filters={{ content: <>filters</> }}
                cols={3}
                colGap={24}
                rowGap={24}
                withFilters
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
            </Grid>,
        );
        //By default filters are shown
        //Filters
        expect(screen.getByText("filters")).toBeInTheDocument();
        //Displays show filters btn
        expect(screen.getByRole("button", { name: translate("showFilters") })).toBeInTheDocument();
    });
});
