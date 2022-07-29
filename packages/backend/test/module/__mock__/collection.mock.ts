import { Collection } from "../../../src/database/entities/Collection";
import UserMock from "./user.mock";

class CollectionMock extends Collection {
    constructor({ id = 1, taxon = "1", name, description, image, header, nfts, user = new UserMock() }: Partial<Collection> = {}) {
        super();
        this.id = id;
        this.taxon = taxon;
        this.name = name;
        this.description = description;
        this.image = image;
        this.header = header;
        this.nfts = nfts;
        this.user = user;
    }
}

export default CollectionMock;
