import { screen } from "@testing-library/react";
import NftInformation from "module/nft/component/display/NftInformation/NftInformation";
import { render, translate } from "test-utils";
import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";
import * as Recoil from "recoil";

describe("NftInformation tests", () => {
    test("Renders correctly without data", () => {
        const createNftDraftRequestMock = new CreateNftDraftRequestMock({
            issuer: undefined,
            transferFee: undefined,
            flags: undefined,
            taxon: undefined,
            metadata: new CreateNftMetadataRequestMock({}),
        });
        const usePublishNftStateMock = jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ data: createNftDraftRequestMock });
        render(<NftInformation />);
        expect(usePublishNftStateMock).toHaveBeenCalled();
        expect(screen.getByRole("heading", { name: translate("noDataProvided") })).toBeInTheDocument();
    });
});
