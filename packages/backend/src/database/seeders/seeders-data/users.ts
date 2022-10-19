import { User } from "../../entities/User";

export const devUsers: User[] = [
    {
        address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
        name: "acarrera",
        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
        header: "https://valenciaplaza.com/public/Image/2022/3/44c4f700-f74c-4ec2-b9c2-8dd0a5bb2ba6_alta-libre-aspect-ratio_default_0_NoticiaAmpliada.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
        address: "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC",
        name: "amillan",
        image: "https://avatars.githubusercontent.com/u/74896585?v=4",
        header: "https://radiopalafolls.cat/wp-content/uploads/2018/06/palafollsdesdelaire.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
        address: "rnoYZB3d7vQ5BH95tLJhbMuD9jR1p7ZZCc",
        name: "jparra",
        image: "https://avatars.githubusercontent.com/u/52425638?v=4",
        header: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hJTIwY2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
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
