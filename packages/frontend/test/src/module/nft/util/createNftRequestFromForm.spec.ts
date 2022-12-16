import createNftRequestFromForm from "module/nft/util/createNftRequestFromForm";
import Color from "color";

describe("createNftRequestFromForm", () => {
    test("Creates full request", () => {
        const request = createNftRequestFromForm({
            name: "name",
            description: "description",
            image: "image",
            backgroundColor: new Color("#FFFFFF"),
            externalUrl: "externalUrl",
            attributes: [{ traitType: "traitType", value: "value" }],
            collection: "1",
            issuer: "issuer",
            transferFee: "10",
            burnable: true,
            onlyXRP: true,
            trustLine: true,
            transferable: true,
        });

        expect(request).toEqual({
            issuer: "issuer",
            transferFee: 10000,
            flags: {
                burnable: true,
                onlyXRP: true,
                trustLine: false,
                transferable: true,
            },
            taxon: 1,
            metadata: {
                name: "name",
                description: "description",
                image: "image",
                backgroundColor: "#FFFFFF",
                externalUrl: "externalUrl",
                attributes: [{ traitType: "traitType", value: "value" }],
            },
        });
    });

    test("Creates empty request", () => {
        const request = createNftRequestFromForm({
            attributes: [],
            burnable: false,
            onlyXRP: false,
            trustLine: false,
            transferable: false,
        });

        expect(request).toEqual({
            issuer: undefined,
            transferFee: undefined,
            flags: {
                burnable: false,
                onlyXRP: false,
                trustLine: false,
                transferable: false,
            },
            taxon: undefined,
            metadata: {
                name: undefined,
                description: undefined,
                image: undefined,
                backgroundColor: undefined,
                externalUrl: undefined,
                attributes: [],
            },
        });
    });
});
