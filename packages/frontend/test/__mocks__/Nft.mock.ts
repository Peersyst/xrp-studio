// TODO: Apply backend DTO
class NftMock {
    id: number;
    // TODO: Add backend metadata type
    metadata: any;

    constructor({ id = 1, metadata = { name: "Contemporany Bird Fifteen", image: "nft-image" } }: any = {}) {
        this.id = id;
        this.metadata = metadata;
    }
}

export default NftMock;
