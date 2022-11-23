import { screen } from "@testing-library/react";
import { render } from "test-utils";
import DropLandingVideoSection from "module/drop/component/display/DropLanding/DropLandingVideoSection/DropLandingVideoSection";

describe("DropLandingVideoSection", () => {
    test("Renders correctly", () => {
        const videoUrl = "video_url";

        render(<DropLandingVideoSection videoUrl={videoUrl} />);

        expect(screen.getByTestId("Player")).toHaveAttribute("data-url", videoUrl);
    });
});
