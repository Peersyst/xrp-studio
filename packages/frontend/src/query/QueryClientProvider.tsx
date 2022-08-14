import { FC, useRef } from "react";
import { QueryCache, QueryClient, QueryClientProvider as BaseQueryClientProvider } from "react-query";
import useHandleErrorMessage from "./useHandleErrorMessage";

const QueryClientProvider: FC = ({ children }): JSX.Element => {
    const handleErrorMessage = useHandleErrorMessage();

    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                    staleTime: 600000,
                },
                mutations: {
                    onError: handleErrorMessage,
                },
            },
            queryCache: new QueryCache({
                onError: handleErrorMessage,
            }),
        }),
    ).current;

    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
};

export default QueryClientProvider;
