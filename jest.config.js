const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ...tsJestTransformCfg,
     preset: "ts-jest",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  },
};