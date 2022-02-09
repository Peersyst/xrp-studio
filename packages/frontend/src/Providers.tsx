import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import StylesProvider from "module/common/style";
import { ModalProvider, ToastProvider } from "@peersyst/react-components";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            notifyOnChangeProps: "tracked",
        },
    },
});

const Providers = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <StylesProvider>
                <ToastProvider>
                    <ModalProvider>
                        {children}
                        {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
                    </ModalProvider>
                </ToastProvider>
            </StylesProvider>
        </QueryClientProvider>
    </RecoilRoot>
);

export default Providers;
