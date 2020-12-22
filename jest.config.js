const pack = require("./package");

module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  testMatch: ["**/*.spec.js"],
  setupFiles: ["./jest.init.js"],
  verbose: true,
  displayName: pack.name,
  name: pack.name,
  transform: {
    "^.+\\.jsx?$": "./jest.transform.js",
  },
};
