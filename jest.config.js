module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileTransformer.js',
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    moduleFileExtensions: ['js', 'jsx'],
    testPathIgnorePatterns: ['__fixtures__']
};
