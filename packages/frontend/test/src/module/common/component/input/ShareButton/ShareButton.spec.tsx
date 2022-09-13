import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import { fireEvent, render } from "test-utils";

describe("Test for the share button", () => {
    test("Renders correctly", () => {
        const mockedShare = jest.fn();
        jest.spyOn(window.navigator, "share").mockImplementation(mockedShare);
        jest.spyOn(window.navigator, "canShare").mockReturnValueOnce(true);
        const shareData: ShareData = {
            title: "XRP Studio",
        };
        const { getByTestId } = render(<ShareButton shareData={shareData} />);
        const shareIcon = getByTestId("ShareIcon");
        expect(shareIcon).toBeInTheDocument();
        fireEvent.click(shareIcon);
        expect(mockedShare).toHaveBeenCalledWith(shareData);
    });
});
