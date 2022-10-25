import { useContext } from "react";
import { FiltersContext } from "../FiltersContext";

export default function useFilters() {
    const { value, setValue } = useContext(FiltersContext);
    return { value, setValue };
}
