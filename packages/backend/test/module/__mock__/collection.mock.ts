import UserMock from "./user.mock";
import { CollectionWithItems } from "../../../src/modules/collection/types";

class CollectionMock extends CollectionWithItems {
    constructor({
        id = 1,
        taxon = "1",
        name,
        description,
        image,
        header,
        nfts,
        user = new UserMock(),
        items = 2,
    }: Partial<CollectionWithItems> = {}) {
        super();
        this.id = id;
        this.taxon = taxon;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.nfts = nfts;
        this.user = user;
        this.items = items;
    }
}

export default CollectionMock;
