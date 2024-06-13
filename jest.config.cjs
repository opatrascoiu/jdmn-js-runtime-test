module.exports = {
  verbose: true,
  restoreMocks: true,
  transform: {
    '^.+\\.(tj|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!antlr4)'
  ]
};