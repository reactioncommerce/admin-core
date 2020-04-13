const config = require("./package/config/jest.config");

module.exports = {
  ...config,
  setupFiles: [
    "<rootDir>/package/scripts/testPolyfills.js"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/package/scripts/setupTests.js"
  ]
};
