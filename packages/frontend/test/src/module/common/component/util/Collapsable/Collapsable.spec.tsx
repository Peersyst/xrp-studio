import { screen } from "@testing-library/react";
import { render } from "test-utils";
import Collapsable from "module/common/component/util/Collapsable/Collapsable";

describe("Collapsable", () => {
    test("Renders collapsed with label prop", () => {
        render(
            <Collapsable label="show">
                <>Content</>
            </Collapsable>,
        );

        expect(screen.getByTestId("UploadIcon")).toBeInTheDocument();
        expect(screen.getByText("show")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    test("Renders collapsed with collapsedLabel prop", () => {
        render(
            <Collapsable label="show" collapsedLabel="collapsed">
                <>Content</>
            </Collapsable>,
        );

        expect(screen.getByTestId("UploadIcon")).toBeInTheDocument();
        expect(screen.getByText("collapsed")).toBeInTheDocument();
        expect(screen.queryByText("show")).toBeNull();
    });

    test("Renders not collapsed", () => {
        render(
            <Collapsable collapse={false} label="show" collapsedLabel="collapsed">
                <>Content</>
            </Collapsable>,
        );

        expect(screen.getByTestId("DownloadIcon")).toBeInTheDocument();
        expect(screen.getByText("show")).toBeInTheDocument();
        expect(screen.queryByText("collapsed")).toBeNull();
    });
});
