import { hashSync } from "bcrypt";

import { User, UserType } from "../../entities/User";

const devUsers = [
    {
        id: 1,
        email: "acarrera@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        email: "scanal@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        email: "jgrau@peersyst.com",
        type: UserType.USER,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const prodUsers = [
    {
        id: 1,
        email: "acarrera@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        email: "scanal@peersyst.com",
        type: UserType.ADMIN,
        password: hashSync("123qweQWE!", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string): User[] {
    if (env === "production") {
        return prodUsers;
    }
    if (env === "development") {
        return devUsers;
    }
    if (env === "test") {
        return devUsers;
    }
    return [];
}
