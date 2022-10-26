import { useContext } from "react";
import { FiltersContext } from "../FiltersContext";

export default function useFilters<T extends Record<string, unknown>>(): FiltersContext<T> {
    const { filters, setFilters } = useContext(FiltersContext);
    return { filters, setFilters };
}
