import BaseMock from "./base.mock";
import { User } from "../../../src/database/entities/User";
import UserMock from "./user.mock";

class UserRepositoryMock extends BaseMock {
    save = jest.fn((user: Partial<User>) => new Promise((resolve) => resolve(user)));
    findOne = jest.fn((address: string) => new Promise((resolve) => resolve(new UserMock({ address }))));
}

export default UserRepositoryMock;
