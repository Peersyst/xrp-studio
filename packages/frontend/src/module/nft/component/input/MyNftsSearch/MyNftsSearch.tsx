import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import { useGetMyNfts } from "module/nft/query/useGetMyNfts";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useState } from "react";

const MyNftsSearch = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const { address } = useWallet();
    //Callback triggereck when the fetch is finished (success and error)
    const onSettled = () => {
        setLoading(false);
    };
    useGetMyNfts({ onSettled });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const handleOnSearch = (value: string) => {
        if (address) {
            setLoading(true);
            //TODO: add search query
        }
    };
    return <SearchBar css={{ width: "18rem" }} className="my-nfts-search" loading={loading} onChange={handleOnSearch} />;
};

export default MyNftsSearch;
