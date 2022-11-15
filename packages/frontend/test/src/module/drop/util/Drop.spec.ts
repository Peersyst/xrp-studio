import { Drop } from "module/drop/util/Drop";
import { DropDtoMock } from "../../../../__mocks__/dto/drop.dto.mock";
import { PreviewDropMock } from "../../../../__mocks__/drop/PreviewDrop.mock";

describe("Drop", () => {
    test("Creates drop from dto", () => {
        const dropDtoMock = new DropDtoMock();
        const drop = new Drop(dropDtoMock);
        expect(drop).toEqual({
            cover: dropDtoMock.collection.header,
            image: dropDtoMock.collection.image,
            name: dropDtoMock.collection.name,
            description: dropDtoMock.collection.description,
            items: dropDtoMock.collection.items,
            // TODO: Get sold from DropDto
            sold: 0,
            price: dropDtoMock.price,
            backgroundColor: dropDtoMock.backgroundColor,
            fontColor: dropDtoMock.fontColor,
            videoUrl: dropDtoMock.videoUrl,
            instagram: dropDtoMock.instagram,
            twitter: dropDtoMock.twitter,
            discord: dropDtoMock.discord,
            faqs: dropDtoMock.faqs,
        });
    });

    test("Creates drop from preview", () => {
        const previewDropMock = new PreviewDropMock();
        const drop = new Drop(previewDropMock);
        expect(drop).toEqual({
            cover: previewDropMock.cover,
            image: previewDropMock.image,
            name: previewDropMock.name,
            description: previewDropMock.description,
            items: previewDropMock.items,
            // TODO: Get sold from DropDto
            sold: previewDropMock.sold,
            price: previewDropMock.price,
            backgroundColor: previewDropMock.backgroundColor,
            fontColor: previewDropMock.fontColor,
            videoUrl: previewDropMock.videoUrl,
            instagram: previewDropMock.instagram,
            twitter: previewDropMock.twitter,
            discord: previewDropMock.discord,
            faqs: previewDropMock.faqs,
        });
    });
});
