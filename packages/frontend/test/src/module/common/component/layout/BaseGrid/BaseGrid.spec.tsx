import { screen } from "@testing-library/react";
import { render } from "test-utils";
import Skeletons from "module/common/component/feedback/Skeletons/Skeletons";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";

describe("BaseGrid", () => {
    test("Renders correctly when not loading", () => {
        render(
            <BaseGrid
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
                cols={3}
                end={false}
                colGap={24}
                rowGap={24}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGrid>,
        );

        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("b")).toBeInTheDocument();
        expect(screen.getByText("c")).toBeInTheDocument();
        expect(screen.getByText("d")).toBeInTheDocument();
        expect(screen.getByText("e")).toBeInTheDocument();
        expect(screen.getByText("f")).toBeInTheDocument();
    });

    test("Renders correctly when has nothing to show", () => {
        render(
            <BaseGrid
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
                cols={3}
                end={false}
                colGap={24}
                rowGap={24}
                breakpoints={[{ maxWidth: 1200, cols: 10 }]}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter}</p>)}
            </BaseGrid>,
        );

        expect(screen.getByRole("heading", { name: "Nothing to show" })).toBeInTheDocument();
    });

    test("Renders correctly when loading", () => {
        render(
            <BaseGrid
                data={undefined}
                Skeletons={Skeletons}
                callback={() => undefined}
                loading
                cols={3}
                end={false}
                colGap={24}
                rowGap={24}
            >
                {(letters) => letters.map((letter, key) => <p key={key}>{letter as any}</p>)}
            </BaseGrid>,
        );

        const grid = screen.getByRole("grid");
        expect(grid.getElementsByClassName("Skeleton").length).toBe(6);
    });
});
