import { useParams } from "react-router-dom";

export const useGetUserAddress = (): string | undefined => {
    const { address: paramsAddress } = useParams<string>();
    return paramsAddress;
};
