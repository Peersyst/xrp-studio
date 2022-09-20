import SearchBar from "module/common/component/input/SearchBar/SearchBar";

const MyNftsSearch = (): JSX.Element => {
    const handleOnSearch = (value: string) => {
        /* eslint-disable no-console*/
        console.log(value);
    };
    return <SearchBar css={{ width: "18rem" }} className="my-nfts-search" onChange={handleOnSearch} />;
};

export default MyNftsSearch;
