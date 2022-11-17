import { renderHook } from "test-utils";
import { usePublishNft, UsePublishNftReturn } from "module/nft/hook/usePublishNft";

const renderUsePublishNftFilters = () => renderHook(() => usePublishNft()).result;

describe("usePublishNft tests", () => {
    test("", () => {
        const handlePublish = async () => {
            return;
        };
        const isPublishing = false;
        const mockResults: UsePublishNftReturn = {
            handlePublish,
            isPublishing,
        };

        const { current } = renderUsePublishNftFilters();
        expect(JSON.stringify(current)).toEqual(JSON.stringify(mockResults));
    });
});
