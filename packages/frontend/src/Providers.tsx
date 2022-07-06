import { Fragment, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "@peersyst/react-components";
import QueryClientProvider from "./query/QueryClientProvider";
import { ConfigProvider } from "config";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Fragment>
        <ConfigProvider>
            <RecoilRoot>
                <ToastProvider>
                    <QueryClientProvider>
                        {children}
                        {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                    </QueryClientProvider>
                </ToastProvider>
            </RecoilRoot>
        </ConfigProvider>
    </Fragment>
);

export default Providers;
