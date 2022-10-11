export const devUsers = [
    {
        address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
        name: "acarrera",
        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
        address: "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC",
        name: "amillan",
        image: "https://avatars.githubusercontent.com/u/74896585?v=4",
        createdAt: new Date(),
        updatedAt: new Date(),
        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    },
    {
        address: "rnoYZB3d7vQ5BH95tLJhbMuD9jR1p7ZZCc",
        name: "jparra",
        image: "https://avatars.githubusercontent.com/u/52425638?v=4",
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
