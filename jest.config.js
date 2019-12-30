module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.ts$',
  // automock: true,
  moduleFileExtensions: ['ts', 'js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
    '\\.ts$': ['ts-jest']
  },
  rootDir: '.',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
};
