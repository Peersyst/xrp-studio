import { useEffect } from "react";
import { useGetXrpBalance } from "../useGetXrpBalance/useGetXrpBalance";

export default (): void => {
    const { refetch } = useGetXrpBalance();
    useEffect(() => {
        refetch();
    }, []);
};
