import BaseMock from "./base.mock";
import { Nft } from "../../../src/database/entities/Nft";

class NftRepositoryMock extends BaseMock {
    save = jest.fn((nft: Nft) => new Promise((resolve) => resolve(nft)));
    getRawOne = jest.fn(() => new Promise((resolve) => resolve({ token_id: "00000001" })));
    orderBy = jest.fn(() => ({ getRawOne: this.getRawOne }));
    where = jest.fn(() => ({ orderBy: this.orderBy }));
    select = jest.fn(() => ({ where: this.where }));
    createQueryBuilder = jest.fn(() => ({ select: this.select }));
}

export default NftRepositoryMock;
