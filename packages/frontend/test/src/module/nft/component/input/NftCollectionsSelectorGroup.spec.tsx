import { render, translate } from "test-utils";
import { CollectionsDtoMock } from "test-mocks";
import NftCollectionsSelectorGroupFilter from "module/nft/component/input/NftColletionsSelectorGroupFilter/NftCollectionsSelectorGroupFilter";

describe("Test for the NftCollectionsSelectorGroupFilter", () => {
    test("Renders correctly", () => {
        const { collections } = new CollectionsDtoMock({ length: 4 });
        const options = collections.map((col) => ({ value: col.id.toString(), label: col.name! }));
        const screen = render(<NftCollectionsSelectorGroupFilter options={options} />);
        expect(screen.getAllByText(collections[0].name!)).toHaveLength(4);
    });
    test("Renders correctly without collections", () => {
        const screen = render(<NftCollectionsSelectorGroupFilter options={[]} />);
        expect(screen.getByText(translate("withoutCollections", { ns: "error" }))).toBeInTheDocument();
    });
    test("Renders correctly when loading", () => {
        const screen = render(<NftCollectionsSelectorGroupFilter options={[]} loading />);
        //Selector Skeletons
        expect(screen.getAllByText("Loading selector")).toHaveLength(3);
    });
});
