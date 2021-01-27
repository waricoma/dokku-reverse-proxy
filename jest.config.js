module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/__tests__/**/*.+(ts|tsx|js)', '<rootDir>/__tests__/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/lib/*.ts?(x)'],
};
