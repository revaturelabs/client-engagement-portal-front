module.exports = {
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    moduleNameMapper: { '\\.(css|less)$': '<rootDir>/styleMock.js' },
    setupFiles: ['<rootDir>/jest.config.js'],
} 
