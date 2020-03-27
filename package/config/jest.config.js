module.exports = {
  moduleFileExtensions: [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node",
    "graphql"
  ],
  setupFiles: [
    "<rootDir>/config/test-polyfills.js"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/test-utils/setupTests.js"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/config/",
    "<rootDir>/reports/",
    "<rootDir>/bin/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/"
  ],
  transform: {
    "\\.(gql|graphql)$": "@jagi/jest-transform-graphql",
    "^.+\\.jsx?$": "./babel.jest.js"
  }
};
