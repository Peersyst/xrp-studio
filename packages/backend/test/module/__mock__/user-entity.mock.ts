import { UserType } from "../../../src/database/entities/User";

const UserMockEntity = {
    id: 1,
    email: "user@example.com",
    type: UserType.USER,
    password: "$2b$10$CAFR1D2UXdNsDDDv0uTgtOWo22H5NZkX9vRqGVWI72FGkGZ/K0.WG",
};

export default {
    find: jest.fn(() => [UserMockEntity]),
    save: jest.fn(() => UserMockEntity),
    findOne: jest.fn((params) => {
        if (params === 1) {
            return UserMockEntity;
        } else if (params && params.where && (params.where.userId === 1 || params.where.email === "user@example.com")) {
            return UserMockEntity;
        } else {
            return null;
        }
    }),
};
