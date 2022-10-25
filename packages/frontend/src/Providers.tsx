import { Fragment, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "config";
import { ToastProvider } from "@peersyst/react-components";
import QueryClientProvider from "./query/QueryClientProvider";
import XummProvider from "module/wallet/providers/xumm/XummProvider";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Fragment>
        <ConfigProvider>
            <RecoilRoot>
                <ToastProvider>
                    <QueryClientProvider>
                        <XummProvider>
                            {children}
                            {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                        </XummProvider>
                    </QueryClientProvider>
                </ToastProvider>
            </RecoilRoot>
        </ConfigProvider>
    </Fragment>
);

export default Providers;
