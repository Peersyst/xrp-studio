import { useContext } from "react";
import { FiltersContext } from "../FiltersContext";

export default function useFilters<T extends Record<string, unknown>>(): FiltersContext<T> {
    const { value, setValue } = useContext(FiltersContext);
    return { value, setValue };
}
