module.exports = {
  preset: 'ts-jest',
  verbose: false,
  testEnvironment: 'node',
  testRegex: "test/e2e/.*.ts",
  collectCoverageFrom: [
    "src/**/*.{ts,}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: 'test/tmp/coverage',
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  roots: [
    "<rootDir>/test",
  ]
};