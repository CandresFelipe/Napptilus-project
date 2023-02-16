module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'eslint-config-prettier',
    'prettier',
    'standard'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: ['builtin', 'external', 'internal', 'sibling', 'type'],
        pathGroups: [
          {
            pattern: './**',
            group: 'internal'
          }
        ]
      }
    ],
    'import/no-unresolved': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true
      }
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'no-unused-vars': 'warn',
    semi: 'off',
    'space-before-function-paren': 'off',
    'multiline-ternary': 'off',
    eqeqeq: 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
