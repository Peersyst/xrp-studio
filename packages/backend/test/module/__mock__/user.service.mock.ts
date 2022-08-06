import BaseMock from "./base.mock";
import { User } from "../../../src/database/entities/User";
import UserMock from "./user.mock";

class UserServiceMock extends BaseMock {
    createIfNotExists = jest.fn((address: string) => new User({ address }));
    findOne = jest.fn((address: string) => new Promise((resolve) => resolve(new UserMock({ address }))));
}

export default UserServiceMock;
