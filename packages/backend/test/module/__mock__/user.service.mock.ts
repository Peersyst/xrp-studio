import BaseMock from "./base.mock";
import { User } from "../../../src/database/entities/User";

class UserServiceMock extends BaseMock {
    createIfNotExists = jest.fn((address: string) => new User({ address }));
}

export default UserServiceMock;
