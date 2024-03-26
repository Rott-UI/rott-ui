// Package Imports
import {defaults as tsjPreset} from 'ts-jest/presets'
import type {JestConfigWithTsJest} from 'ts-jest'

const isolatedModules = process.env.ISOLATED_MODULES === 'true'
const jestConfiguration: JestConfigWithTsJest = {
  ...tsjPreset,
  preset: 'react-native',
  coverageReporters: ['cobertura'],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: 'jest-test-reports', outputName: 'report.xml'}],
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
        isolatedModules,
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|react-native-reanimated|@twotalltotems/react-native-otp-input)',
  ],
  // setupFiles: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.ts', '@testing-library/jest-native/extend-expect'],
  moduleDirectories: [
    'node_modules',
    'utils',
    __dirname, // the root directory
  ],
  moduleNameMapper: {
    'tr-TR.json': '<rootDir>/src/libs/i18n/tr-TR.json',
    'en-US.json': '<rootDir>/src/libs/i18n/en-US.json',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
}

export default jestConfiguration
