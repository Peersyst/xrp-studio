import "@testing-library/jest-dom";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

describe("TokenSecureStorageTest", () => {
    const value = "foo";
    test("Save and get token", async () => {
        AuthTokenStorage.set(value);
        expect(AuthTokenStorage.get()).toEqual("foo");
    });

    test("Clear token", async () => {
        AuthTokenStorage.set(value);
        AuthTokenStorage.clear();
        expect(AuthTokenStorage.get()).toBeNull();
    });
});
