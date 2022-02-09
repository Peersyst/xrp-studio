module.exports = {
    plugins: ["eslint-plugin-cypress"],
    extends: ["plugin:cypress/recommended"],
    env: { "cypress/globals": true },
    rules: {
        "import/no-anonymous-default-export": "off",
    },
};
