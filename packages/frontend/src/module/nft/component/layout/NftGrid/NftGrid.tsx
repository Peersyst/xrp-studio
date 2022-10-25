import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import { SelectorOption } from "@peersyst/react-components-core";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";
import { UseGetNftsOptions } from "module/nft/query/useGetNfts";

function NftGrid({ loading, collections = [], ...rest }: NftGridProps): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const tags: SelectorOption<CollectionId>[] = collections.map(({ id, name }) => ({ value: id, label: name ?? "Collection" + id }));
    return (
        <Grid<PaginatedNftDto, CollectionId, UseGetNftsOptions>
            filters={{
                ...(tags.length > 0 && {
                    content: (
                        <SelectorGroupFilter
                            css={{
                                [".Label"]: {
                                    width: "unset",
                                    flex: "1",
                                },
                            }}
                            multiple={true}
                            name="collection"
                            options={tags}
                            type="switch"
                        />
                    ),
                }),
            }}
            loading={loading}
            tags={tags}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

export default NftGrid;
