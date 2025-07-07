import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      'no-undef': 'off', // Disable the 'no-undef' rule globally
      'no-console': 'warn', // Allow console.log, but give a warning
    },
  },
  {
    // Specific config for functions folder (Node.js/CommonJS)
    files: ['functions/**/*.js', 'tailwind.config.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly', // Add console for Node.js files
      },
    },
  },
  {
    // Specific config for React files
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
      },
    },
  },
  {
    // Ignore certain files
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.git/**'],
  },
];
