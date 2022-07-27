import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Animated, Typography } from "@peersyst/react-components";
import { ArrowIcon } from "icons";
import { useLogin } from "module/auth/query/useLogin";
import Button from "module/common/component/input/Button/Button";
import { useAuth } from "module/auth/hook/useAuth";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import BaseGrid from "module/common/component/layout/BaseGrid/BaseGrid";
import { BaseCardSkeletons } from "module/common/component/nft/Skeletons/Skeletons";
import CollectionCard from "module/common/component/surface/CollectionCard/CollectionCard";

export default function DashboardPage(): JSX.Element {
    const login = useLogin();
    const translate = useTranslate();
    const {
        state: { token, isLogged },
        logout,
    } = useAuth();

    return (
        <BasePage>
            <Animated.Slide direction="left">
                <div
                    css={{
                        backgroundColor: "lightgray",
                        color: "red",
                    }}
                >
                    <Typography variant="subtitle1">{translate("name")}</Typography>
                    <Typography variant="body1">logged: {token || ""}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                        {config.projectName}
                    </Typography>
                </div>
            </Animated.Slide>
            <ArrowIcon />
            <Button
                onClick={() => (!isLogged ? login.mutate({ username: "Charlie", password: "Test1234" }) : logout())}
                css={`
                    margin-top: 20px;
                `}
            >
                {!isLogged ? (login.isLoading ? "Loading..." : "Log in") : "Log out"}
            </Button>
            {login.isError && (
                <Typography
                    variant="body1"
                    css={`
                        color: red;
                    `}
                >
                    {JSON.stringify(login.error)}
                </Typography>
            )}
            <CollectionCard
                collection={{
                    id: 1,
                    name: "Bored Apes",
                    image: "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s168",
                    items: 10000,
                }}
            />
            <BaseGrid
                data={{
                    pageParams: [],
                    pages: [
                        {
                            currentPage: 1,
                            pages: 2,
                            items: [
                                {
                                    id: 1,
                                    metadata: {
                                        name: "NFT1",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                                {
                                    id: 2,
                                    metadata: {
                                        name: "NFT2",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                                {
                                    id: 3,
                                    metadata: {
                                        name: "NFT3",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                            ],
                        },
                        {
                            currentPage: 2,
                            pages: 2,
                            items: [
                                {
                                    id: 4,
                                    metadata: {
                                        name: "NFT4",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                                {
                                    id: 5,
                                    metadata: {
                                        name: "NFT5",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                                {
                                    id: 6,
                                    metadata: {
                                        name: "NFT6",
                                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                                    },
                                },
                            ],
                        },
                    ],
                }}
                Skeletons={BaseCardSkeletons}
                callback={() => undefined}
                loading={true}
                cols={3}
                end={false}
                colGap={24}
                rowGap={24}
            >
                {(nfts) => nfts.map((nft) => <NftCard nft={nft} />)}
            </BaseGrid>
        </BasePage>
    );
}
