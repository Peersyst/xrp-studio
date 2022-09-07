import BaseNftsGrid from "module/nft/component/layout/BaseNftGrid/BaseNftGrid";
import { render } from "test-utils";

describe("BaseNftsGrid test", () => {
    test("Trigger singin correctly", () => {
        const screen = render(
            <BaseNftsGrid
                data={undefined}
                callback={() => fetchNextPage({ cancelRefetch: false })}
                end={!hasNextPage}
                loading={isFetching}
                nothingToShow={tErr("nothingToShow")}
            >
                {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={isFetching} />)}
            </BaseNftsGrid>,
        );
    });
});
