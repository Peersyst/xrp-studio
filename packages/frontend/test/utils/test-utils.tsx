import { FC, PropsWithChildren, ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryClientConfig, QueryCache } from "react-query";
import StylesProvider from "module/common/style";
import { ModalProvider, ToastProvider } from "@peersyst/react-components";
import { RecoilRoot } from "recoil";
import { renderHook, RenderHookOptions, RenderHookResult } from "@testing-library/react-hooks";
import { InitialEntry } from "history";
import { deepmerge } from "@peersyst/react-utils";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/locale/i18n";

export interface CreateWrapperConfig {
    queryClientConfig?: QueryClientConfig;
}

export interface RouterConfig {
    initialEntries?: InitialEntry[];
    initialIndex?: number;
    path?: string;
}

export const createWrapper = ({ queryClientConfig }: CreateWrapperConfig = {}): FC => {
    const queryClient = new QueryClient(
        deepmerge(
            {
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },
                queryCache: new QueryCache(),
            },
            queryClientConfig,
        ),
    );

    return function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
        return (
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <StylesProvider>
                        <ToastProvider>
                            <ModalProvider>
                                <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
                            </ModalProvider>
                        </ToastProvider>
                    </StylesProvider>
                </QueryClientProvider>
            </RecoilRoot>
        );
    };
};

const customRender = (
    ui: ReactElement,
    {
        queryClientConfig,
        router: { path = "/", ...memoryRouterProps } = {},
        ...rest
    }: Omit<RenderOptions, "wrapper"> & CreateWrapperConfig & { router?: RouterConfig } = {},
): RenderResult => {
    return render(
        <MemoryRouter {...memoryRouterProps}>
            <Routes>
                <Route path={path} element={ui} />
            </Routes>
        </MemoryRouter>,
        {
            wrapper: createWrapper({ queryClientConfig }),
            ...rest,
        },
    );
};

const customRenderHook = <TProps, TResult>(
    callback: (props: TProps) => TResult,
    { queryClientConfig, ...rest }: Omit<RenderHookOptions<TProps>, "wrapper"> & CreateWrapperConfig = {},
): RenderHookResult<TProps, TResult> => renderHook<TProps, TResult>(callback, { wrapper: createWrapper({ queryClientConfig }), ...rest });

const translate = i18n.t;

export * from "@testing-library/react";
export { customRender as render };
export * from "./fail-api-call";
export * from "./success-api-call";
export { customRenderHook as renderHook };
export { translate };
