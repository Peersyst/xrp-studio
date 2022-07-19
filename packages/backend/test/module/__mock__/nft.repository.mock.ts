import BaseMock from "./base.mock";
import { Nft } from "../../../src/database/entities/Nft";

class NftRepositoryMock extends BaseMock {
    save = jest.fn(
        ({ collection, metadata, id = 1, ...restNft }: Nft) =>
            new Promise((resolve) =>
                resolve({
                    id,
                    ...restNft,
                    ...(collection && { collection: { ...collection, id: collection.id || 1 } }),
                    ...(metadata && {
                        metadata: {
                            ...metadata,
                            nft: metadata.nft || { id, ...restNft },
                            ...(metadata.attributes && {
                                attributes: metadata.attributes.map((attribute) => ({
                                    ...attribute,
                                    nftMetadataId: attribute.nftMetadataId || id,
                                })),
                            }),
                        },
                    }),
                }),
            ),
    );
    getRawOne = jest.fn(() => new Promise((resolve) => resolve({ token_id: "00000001" })));
    orderBy = jest.fn(() => ({ getRawOne: this.getRawOne }));
    where = jest.fn(() => ({ orderBy: this.orderBy }));
    select = jest.fn(() => ({ where: this.where }));
    createQueryBuilder = jest.fn(() => ({ select: this.select }));
}

export default NftRepositoryMock;
