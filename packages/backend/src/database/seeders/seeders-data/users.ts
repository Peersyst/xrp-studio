import { User } from "../../entities/User";

export const devUsers: User[] = [
    {
        address: "rwEiU5xL5GJUzX1cd7cvaHtf27CS2DYTGf",
        name: "acarrera",
        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        address: "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC",
        name: "amillan",
        image: "https://avatars.githubusercontent.com/u/74896585?v=4",
        header: "https://radiopalafolls.cat/wp-content/uploads/2018/06/palafollsdesdelaire.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        address: "rnoYZB3d7vQ5BH95tLJhbMuD9jR1p7ZZCc",
        name: "jparra",
        image: "https://avatars.githubusercontent.com/u/52425638?v=4",
        header: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hJTIwY2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development" || env === "preview") {
        return devUsers;
    }
    if (env === "test") {
        return devUsers;
    }
    return [];
}
