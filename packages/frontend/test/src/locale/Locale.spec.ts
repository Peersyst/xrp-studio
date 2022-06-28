import { LocaleType, NameSpacesType } from "locale/i18n.types";
import { resources } from "../../__mocks__/i18nMock";

describe("Test for the locales", () => {
    test("Locales test: All locales have same number of namespaces. Then, for each namespace check that all have same number of keys", () => {
        const languages = Object.keys(resources) as LocaleType[];
        const localeNameSpaces = languages.map((lang) => Object.keys(resources[lang])) as NameSpacesType[][];
        const baseNsLength = localeNameSpaces[0].length;
        //For each locale
        localeNameSpaces.forEach((namespacesArray, localeIndex) => {
            //Don't compare to itself
            if (localeIndex > 0) {
                expect(namespacesArray.length).toBe(baseNsLength);
                //For each namespace
                namespacesArray.forEach((ns) => {
                    const baseNameSpaceLength = Object.keys(resources["en"][ns]).length;
                    const namespaceLength = Object.keys(resources[languages[localeIndex]][ns]).length;
                    expect(baseNameSpaceLength).toBe(namespaceLength);
                });
            }
        });
    });
});
