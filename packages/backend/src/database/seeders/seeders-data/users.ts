import { User } from "../../entities/User";

export const devUsers: User[] = [
    {
        address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
        name: "acarrera",
        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
        header: "https://valenciaplaza.com/public/Image/2022/3/44c4f700-f74c-4ec2-b9c2-8dd0a5bb2ba6_alta-libre-aspect-ratio_default_0_NoticiaAmpliada.jpg",
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
    if (env === "development") {
        return devUsers;
    }
    if (env === "test") {
        return devUsers;
    }
    return [];
}
