module.exports = {
    // extends: ["eslint:recommended", "standard-preact"],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        }
    },
    plugins: [
        "react"
    ],
    settings: {
        react: {
            pragma: 'h'
        }
    },
    env: {
        browser: true,
        node: true,
        jquery: true,
        commonjs: true,
        es6: true
    }
};