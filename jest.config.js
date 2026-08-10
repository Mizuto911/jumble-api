export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  roots: ["./src/test"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  // Maps explicit ESM imports (.js) back to your original source files (.ts)
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
