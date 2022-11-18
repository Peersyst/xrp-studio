import NftPublishTabs from "../../../../../../../src/module/nft/component/navigation/NftPublishTabs/NftPublishTabs";
import { render, translate } from "test-utils";
import { screen } from "@testing-library/react";
import { CreateNftDraftRequestMock, CreateNftMetadataRequestMock } from "test-mocks";
import * as Recoil from "recoil";

describe("NftPublishTabs tests", () => {
    const TAB = 0;
    const createNftDraftRequestMock = new CreateNftDraftRequestMock({
        issuer: undefined,
        transferFee: undefined,
        flags: undefined,
        taxon: undefined,
        metadata: new CreateNftMetadataRequestMock({}),
    });

    test("Renders correctly first tab", () => {
        const usePublishNftStateMock = jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ data: createNftDraftRequestMock });

        render(<NftPublishTabs tab={TAB} />);

        expect(usePublishNftStateMock).toHaveBeenCalled();
        expect(screen.getByRole("heading", { name: translate("noDataProvided") })).toBeInTheDocument();
    });
});
