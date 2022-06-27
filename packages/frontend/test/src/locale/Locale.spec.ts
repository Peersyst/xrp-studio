import { resources } from "../../__mocks__/i18nMock";

describe("Test for the locales", () => {
    test("All locales have same number of elements", () => {
        const languages = Object.keys(resources);
        expect(languages.length).toBe(2);
    });
});
