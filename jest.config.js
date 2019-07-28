module.exports = {
    "setupFiles": ["<rootDir>/shim.js", "<rootDir>/setupTests.ts"],
    // setupTestFrameworkScriptFile: "<rootDir>/setupTests.ts",
    testEnvironment: "node",
    testMatch: [
        "**/**/*.test.ts?(x)", "**/**/*.test.js?(x)", "**/?(*.)+(spec|test).js?(x)"
    ],
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!(lodash-es|react)/)"], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
    moduleNameMapper: {
        "aurelia-(.*)": "<rootDir>/node_modules/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
    },
    // some coverage and results processing options
    collectCoverage: true,
    collectCoverageFrom: [
        "src/tests/*.ts?(x)",
        "src/tests/*.js?(x)",
    ],
    coverageDirectory: "./coverage",
    coverageReporters: ["json", "lcov", "text"]
};