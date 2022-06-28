import { Fragment, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import StylesProvider from "module/common/style";
import { ToastProvider } from "@peersyst/react-components";
import QueryClientProvider from "./query/QueryClientProvider";

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Fragment>
        <RecoilRoot>
            <StylesProvider>
                <ToastProvider>
                    <QueryClientProvider>
                        {children}
                        {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                    </QueryClientProvider>
                </ToastProvider>
            </StylesProvider>
        </RecoilRoot>
    </Fragment>
);

export default Providers;
