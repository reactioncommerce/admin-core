const config = require("./package/config/jest.config");

module.exports = {
  ...config,
  setupFiles: [
    "<rootDir>/package/config/test-polyfills.js"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/package/src/test-utils/setupTests.js"
  ]
};
