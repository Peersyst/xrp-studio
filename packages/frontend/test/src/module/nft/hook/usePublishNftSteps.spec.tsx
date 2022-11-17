import { renderHook } from "test-utils";
import usePublishNftSteps, { ReturnUsePublishNftSteps } from "module/nft/hook/usePublishNftSteps";

const renderUsePublishNftSteps = () => renderHook(() => usePublishNftSteps()).result;

describe("usePublishNftSteps tests", () => {
    test("", () => {
        const handlePublish = async () => {
            return;
        };
        const mockedResults: ReturnUsePublishNftSteps = {
            handleClick: handlePublish,
            isLoading: false,
            tab: 0,
        };

        const { current } = renderUsePublishNftSteps();
        expect(JSON.stringify(current)).toEqual(JSON.stringify(mockedResults));
    });
});
