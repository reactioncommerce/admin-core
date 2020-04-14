module.exports = {
  extends: "@reactioncommerce",
  ignorePatterns: [
    "reports",
    "dist",
    "node_modules"
  ],
  globals: {
    "jasmine": true,
    "jest/globals": true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "id-length": ["error", { exceptions: ["t", "_"] }],
    "jsx-a11y/label-has-for": "off",
    "node/no-extraneous-import": "off",
    "node/no-missing-import": "off",
    "node/no-missing-require": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unpublished-import": "off",
    "node/no-unpublished-require": "off"
  }
};
