import { defineConfig } from "cypress";

export default defineConfig({
    fixturesFolder: "test/config/fixtures",
    screenshotsFolder: "test/config/screenshots",
    videosFolder: "test/config/videos",
    downloadsFolder: "test/config/downloads",
    screenshotOnRunFailure: false,
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {},
    e2e: {
        setupNodeEvents(on, config) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return require("./test/config/plugins/index.js")(on, config);
        },
        baseUrl: "http://localhost:8182",
        specPattern: "test/e2e/**/*.cy.{js,jsx,ts,tsx}",
        supportFile: "test/config/support/index.ts",
    },
});
