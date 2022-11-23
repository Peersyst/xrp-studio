import BaseMock from "./base.mock";
import { CollectionService } from "../../../src/modules/collection/collection.service";
import CollectionMock from "./collection.mock";
import { CollectionDto } from "../../../src/modules/collection/dto/collection.dto";

class CollectionServiceMock extends BaseMock {
    findOne = jest
        .spyOn(CollectionService.prototype, "findOne")
        .mockReturnValue(new Promise((resolve) => resolve(CollectionDto.fromEntity(new CollectionMock()))));
    addItems = jest.fn();
}

export default CollectionServiceMock;
