import createCollectionRequestFromForm from "module/collection/util/createCollectionRequestFromForm";
import { CollectionCreationFormMock } from "../../../../__mocks__/collections/CollectionCreationForm.mock";

describe("createCollectionRequestFromForm", () => {
    describe("Creates UpdateCollectionRequest", () => {
        test("Creates request", () => {
            const formMock = new CollectionCreationFormMock();
            const request = createCollectionRequestFromForm("update", formMock);
            expect(request).toEqual({
                header: formMock.header,
                image: formMock.image,
                name: formMock.name,
                description: formMock.description,
                nfts: formMock.nfts,
            });
        });
    });

    describe("Creates CreateCollectionRequest", () => {
        test("Creates request with NFTs", () => {
            const formMock = new CollectionCreationFormMock();
            const request = createCollectionRequestFromForm("create", formMock);
            expect(request).toEqual({
                header: formMock.header,
                image: formMock.image,
                name: formMock.name,
                description: formMock.description,
                nfts: formMock.nfts,
            });
        });

        test("Creates request without NFTs", () => {
            const formMock = new CollectionCreationFormMock({ nfts: [] });
            const request = createCollectionRequestFromForm("create", formMock);
            expect(request).toEqual({
                header: formMock.header,
                image: formMock.image,
                name: formMock.name,
                description: formMock.description,
                nfts: undefined,
            });
        });
    });
});
