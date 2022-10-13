module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'standard-with-typescript'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
            tsx: true
        }
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        semi: [1, 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        curly: 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off'
    }
};
