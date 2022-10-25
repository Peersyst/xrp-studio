import { Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import PageHeader from "module/common/component/layout/PageHeader/PageHeader";
import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { capitalize } from "@peersyst/react-utils";

export default function DashboardPage(): JSX.Element {
    const translate = useTranslate();
    return (
        <BaseNftPage
            nft={{
                id: 1,
                tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D25",
                mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F1",
                transferFee: 10,
                flags: 0,
                status: "confirmed",
                user: {
                    address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
                    name: "acarrera",
                    image: "https://avatars.githubusercontent.com/u/23333654?v=4",
                    header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                },
                uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
            }}
            header={
                <PageHeader>
                    <Typography variant="subtitle1">{capitalize(translate("name"))}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                        {config.projectName}
                    </Typography>
                </PageHeader>
            }
            fixedCollection
            collectionNfts={[
                {
                    id: 1,
                    tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D25",
                    mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F1",
                    transferFee: 10,
                    flags: 0,
                    status: "confirmed",
                    user: {
                        address: "rsgi7ENscrVaXC44JE2m94XzKQrmAVX2gV",
                        name: "acarrera",
                        image: "https://avatars.githubusercontent.com/u/23333654?v=4",
                        header: "https://s3-alpha-sig.figma.com/img/fa04/7fe7/fbc1a7233ff3dbdc2ceff5f386755445?Expires=1666569600&Signature=cMgjPAv83dnlOimN8SJ1MJkF~D52QQC5~hypRodlLkNUelp6XrH7ZTnEe4Tnc2yJsQr9-ZyiHzVtPG1zOSxEnUsIgp3EqL~8LlxkipW1CpAuj24P1QiAeuAmGLndGmTwDkPS6elY0WwXngVddlnFUDM3rXy0jWxL5J1vd27DIbdZJflTT6UaSTt14zY2VGMuoIdUHFzriSQoMbvCJD3IFwO1ZabyCoN4v1qKUNDX1Wfbdgdh7epRCjCEsI0poghlFPKuyFwPkYLt8~VqQyAX5UuLieV0h7sstFWJbkB~byUDrB66OdsfJsaRZOB6emyyKzEUXl3sad5KYilvDHJjDA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                    },
                    uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
                },
            ]}
        />
    );
}
