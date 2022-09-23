import { useParams } from "react-router-dom";

export const useGetUserAddress = (address?: string): string | undefined => {
    const { address: paramsAddress } = useParams<string>();
    return address || paramsAddress;
};
