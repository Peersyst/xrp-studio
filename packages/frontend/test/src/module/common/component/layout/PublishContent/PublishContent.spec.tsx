import { render } from "test-utils";
import { screen } from "@testing-library/react";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";

describe("PublishContent tests", () => {
    const COVER = "image";

    test("Renders correctly with cover", () => {
        render(
            <PublishContent>
                {{
                    cover: COVER,
                    feedback: <div>feedback</div>,
                    footer: <div>footer</div>,
                }}
            </PublishContent>,
        );

        expect(screen.getByRole("img")).toHaveAttribute("src", COVER);
    });
});
