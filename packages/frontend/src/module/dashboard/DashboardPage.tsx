import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Animated, Typography } from "@peersyst/react-components";
import { ArrowIcon } from "icons";
import { useLogin } from "module/auth/query/useLogin";
import Button from "module/common/component/input/Button/Button";
import { useAuth } from "module/auth/hook/useAuth";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import NftCard from "module/common/component/surface/NftCard/NftCard";

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
            <NftCard
                nft={{
                    id: 1,
                    metadata: {
                        name: "Nft name",
                        image: "https://lh3.googleusercontent.com/_borwJwD2OKqzsRbPcQXvZMqSL10_stNmyxRsJRRep6hQnU_IkxmR7j9EYyG5Ae1Exvor7MhWcJhP0uDKzKGMmDPreeSYrNeU113=w600",
                    },
                }}
            />
        </BasePage>
    );
}
