import { UserType } from "../../../src/database/entities/User";

const UserMockEntity = {
    id: 1,
    email: "user@example.com",
    type: UserType.USER,
    password: "$2b$10$CAFR1D2UXdNsDDDv0uTgtOWo22H5NZkX9vRqGVWI72FGkGZ/K0.WG",
};

export default {
    userEmailPasswordMatch: jest.fn(() => UserMockEntity),
};
