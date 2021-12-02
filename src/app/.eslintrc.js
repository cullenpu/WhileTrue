module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.json'],  //required for "type-aware linting"
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'warn',
      'no-use-before-define': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'react/jsx-no-bind': 'off',
      'import/prefer-default-export': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'spaced-comment': 'off',
      'import/no-extraneous-dependencies': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  };
  