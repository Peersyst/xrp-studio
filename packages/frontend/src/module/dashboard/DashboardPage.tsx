import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Animated, Typography } from "@peersyst/react-components";
import { ArrowIcon } from "icons";
import { useLogin } from "module/auth/query/useLogin";
import Button from "module/common/component/input/Button/Button";
import { useAuth } from "module/auth/hook/useAuth";
import useTranslate from "module/common/hook/useTranslate";
import { config } from "config";
import { useSignIn } from "xumm-react";

export default function DashboardPage(): JSX.Element {
    const login = useLogin();
    const translate = useTranslate();
    const {
        state: { token },
    } = useAuth();

    const { signIn, isLoading, isError, signInData: { xummPayload } = {}, verifySignInData } = useSignIn();
    const qr = xummPayload?.refs?.qr_png;

    if (verifySignInData) console.log(verifySignInData);

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
            {!isError && qr ? (
                <img src={qr} css={{ width: 200, height: 200 }} alt="xumm-qr" />
            ) : (
                <Button onClick={signIn} loading={isLoading}>
                    {"Sign in"}
                </Button>
            )}
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
        </BasePage>
    );
}
