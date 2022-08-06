import BaseMock from "./base.mock";
import { User } from "../../../src/database/entities/User";

class UserRepositoryMock extends BaseMock {
    save = jest.fn((user: Partial<User>) => user);
}

export default UserRepositoryMock;
