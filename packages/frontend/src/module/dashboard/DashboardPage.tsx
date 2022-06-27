import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Animated, Typography } from "@peersyst/react-components";
import { ArrowIcon } from "icons";
import { useLogin } from "module/auth/query/useLogin";
import Button from "module/common/component/input/Button/Button";
import { useAuth } from "module/auth/hook/useAuth";
import { useTranslation } from "react-i18next";

export default function DashboardPage(): JSX.Element {
    const login = useLogin();
    const { t: translate } = useTranslation();
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
                        {process.env.REACT_APP_NAME}
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
            {login.error && (
                <Typography
                    variant="body1"
                    css={`
                        color: red;
                    `}
                >
                    {JSON.stringify(login.error)}
                </Typography>
            )}
        </BasePage>
    );
}
