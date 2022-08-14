// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// matchmedia mock
import { LightMatchMediaMock } from "./__mocks__/MatchMediaMock";
import { IntersectionObserverMock } from "./__mocks__/IntersectionObserverMock";
import { ResizeObserverMock } from "./__mocks__/ResizeObserverMock";

jest.mock("@peersyst/react-components", () => ({
    __esModule: true,
    ...jest.requireActual("@peersyst/react-components"),
}));

import { XummReactMock } from "./__mocks__/xumm-react/XummReact.mock";
jest.mock("xumm-react", () => ({
    __esModule: true,
    ...new XummReactMock(),
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
window.ResizeObserver = jest.fn().mockImplementation(ResizeObserverMock);

// Turn off network queries error logging
/* eslint-disable no-console  */
/* eslint-disable @typescript-eslint/no-empty-function */
import { setLogger } from "react-query";

setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
});
