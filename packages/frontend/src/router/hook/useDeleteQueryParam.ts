import { useSearchParams } from "react-router-dom";

export default function (): (param: string) => void {
    const [searchParams, setSearchParams] = useSearchParams();

    return (param: string): void => {
        searchParams.delete(param);
        setSearchParams(searchParams);
    };
}
