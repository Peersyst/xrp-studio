/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
const { resolve } = require("path");
// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig.path");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
    moduleDirectories: [
        "node_modules",
        "utils", // a utility folder
        "__mocks__", // a utility folder
        __dirname, // the root directory
    ],
    transform: {
        "\\.[jt]sx?$": "ts-jest",
        "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    },
    testRegex: ".*\\.spec\\.(ts|tsx)$",
    transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
    collectCoverageFrom: [
        "./src/**/*.(ts|js|tsx|jsx)",
        "!./src/**/index.(ts|js|tsx|jsx)",
        "!./src/**/*.d.ts",
        "!./src/module/api/**/*",
        "!./src/router/**/*",
        "!./src/script/**/*",
        "!./src/**/*.(styles|types).(ts|js|tsx|jsx)",
        "!./src/module/common/icons/**/*",
        "!./src/module/common/style/**/*",
        "!./src/module/common/service/BaseStorageService.ts",
        "!./src/Providers.tsx",
        "!./src/**/*Router.tsx",
        "!./src/**/mock/**/*",
        "!./src/module/common/component/navigation/ScrollToTop/ScrollToTop.tsx",
        "!./src/query/QueryClientProvider.tsx",
    ],
    coverageDirectory: "./coverage",
    coverageThreshold: {
        global: {
            branches: 50,
            statements: 50,
        },
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: resolve(compilerOptions.baseUrl) }),
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass)$": "identity-obj-proxy",
    },
};
