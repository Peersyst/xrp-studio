import { FC, useRef } from "react";
import { QueryCache, QueryClient, QueryClientProvider as BaseQueryClientProvider } from "react-query";
import { useToast } from "@peersyst/react-components";
import { handleErrorMessage } from "./handleErrorMessage";

const QueryClientProvider: FC = ({ children }): JSX.Element => {
    const { showToast } = useToast();

    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                    staleTime: 600000,
                },
                mutations: {
                    onError: (error) => {
                        const { message, type } = handleErrorMessage(error);
                        showToast(message, { type });
                    },
                },
            },
            queryCache: new QueryCache({
                onError: (error) => {
                    const { message, type } = handleErrorMessage(error);
                    showToast(message, { type });
                },
            }),
        }),
    ).current;

    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
