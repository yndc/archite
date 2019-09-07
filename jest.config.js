module.exports = {
  preset: 'ts-jest',
  verbose: false,
  testEnvironment: 'node',
  testRegex: "tests/cases/.*.ts",
  collectCoverageFrom: [
    "src/**/*.{ts,}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: 'tests/tmp/coverage',
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  roots: [
    "<rootDir>/tests",
  ]
};