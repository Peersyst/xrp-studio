// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// matchmedia mock
import { LightMatchMediaMock } from "mocks/MatchMediaMock";
import { IntersectionObserverMock } from "mocks/IntersectionObserverMock";
import { loadLocalization } from "locale";

jest.mock("@peersyst/react-components", () => ({
    __esModule: true,
    ...jest.requireActual("@peersyst/react-components"),
}));

jest.mock("react-router-dom", () => ({
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
}));

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(LightMatchMediaMock),
});

window.IntersectionObserver = jest.fn().mockImplementation(IntersectionObserverMock);

loadLocalization();

// Turn off network queries error logging
/* eslint-disable no-console  */
/* eslint-disable @typescript-eslint/no-empty-function */
import { setLogger } from "react-query";
setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
});
