import BaseMock from "./base.mock";
import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionMock from "./collection.mock";

class CollectionServiceMock extends BaseMock {
    findCollectionByTaxonAndAccount = jest
        .spyOn(CollectionService.prototype, "findCollectionByTaxonAndAccount")
        .mockReturnValue(new Promise((resolve) => resolve(new CollectionMock())));
}

export default CollectionServiceMock;
