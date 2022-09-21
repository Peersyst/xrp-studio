import { debounce } from "@peersyst/react-utils";
import { useRef, useState } from "react";
import { UseSearchBar } from "./useSearchBar.types";

export const useSearchBar: UseSearchBar = ({ onQuery, delay = 600 }) => {
    const [query, setQuery] = useState<string>();
    const [loading, setLoading] = useState(false);
    const handleChange = (q: string) => {
        setLoading(true);
        setQuery(q);
        changeQuery(q);
    };
    const changeQuery = useRef(
        debounce((q: string) => {
            onQuery?.(q);
            setLoading(false);
        }, delay),
    ).current;
    return {
        value: query,
        loading,
        onChange: handleChange,
    };
};
