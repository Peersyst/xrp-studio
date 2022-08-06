import { createContext, createRef, RefObject, useContext } from "react";

export interface PageContextI {
    headerRef: RefObject<HTMLDivElement>;
}

export const PageContext = createContext<PageContextI>({ headerRef: createRef() });

export const useHeaderRef = (): RefObject<HTMLDivElement> => useContext(PageContext).headerRef;
