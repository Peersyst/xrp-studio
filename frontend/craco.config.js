const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
            source: 'tsconfig',
            baseUrl: './src',
            tsConfigPath: './tsconfig.path.json',
            },
        },
    ],
    babel: {
        plugins: [
            ["babel-plugin-styled-components", { displayName: true }]
        ]
    },
};
