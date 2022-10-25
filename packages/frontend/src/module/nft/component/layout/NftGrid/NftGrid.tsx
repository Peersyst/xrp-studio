import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import NftCard from "../../display/NftCard/NftCard";
import { PaginatedNftDto } from "module/api/service";
import { CollectionId, NftGridProps } from "./NftGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { useGetNftGridBreakpoints } from "./hook/useGetNftGridBreakpoints";
import { SelectorOption } from "@peersyst/react-components-core";
import { FiltersBaseContextValue } from "module/common/component/input/Filters/FiltersContext";
import SelectorGroupFilter from "module/common/component/input/Filters/SelectorGroupFilter/SelectorGroupFilter";

function NftGrid<F extends FiltersBaseContextValue>({ loading, ...rest }: NftGridProps<F>): JSX.Element {
    const breakpoints = useGetNftGridBreakpoints();
    const tags: SelectorOption<CollectionId>[] = [
        { label: "All", value: 1 },
        { label: "Art", value: 2 },
        { label: "Music", value: 3 },
    ];
    return (
        <Grid<PaginatedNftDto, CollectionId, F>
            filters={{
                content: (
                    <SelectorGroupFilter
                        name="collection"
                        options={tags}
                        type="switch"
                        css={{
                            [".Label"]: {
                                width: "unset",
                                flex: "1",
                            },
                        }}
                    />
                ),
            }}
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            {...rest}
        >
            {(nfts) => nfts.map((nft, key) => <NftCard nft={nft} key={key} loading={loading} />)}
        </Grid>
    );
}

export default NftGrid;
