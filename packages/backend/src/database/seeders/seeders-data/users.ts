export const devUsers = [
    {
        address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
        name: "acarrera",
        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        address: "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC",
        name: "amillan",
        image: "https://avatars.githubusercontent.com/u/74896585?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        address: "rnoYZB3d7vQ5BH95tLJhbMuD9jR1p7ZZCc",
        name: "jparra",
        image: "https://avatars.githubusercontent.com/u/52425638?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development") {
        return devUsers;
    }
    if (env === "test") {
        return devUsers;
    }
    return [];
}
