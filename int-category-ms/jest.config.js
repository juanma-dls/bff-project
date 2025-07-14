const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src/__tests__"],
  preset: "ts-jest",
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverageFrom: [
    "**/*.{ts,js}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
  ],
};
