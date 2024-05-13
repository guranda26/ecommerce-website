module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'eslint-config-prettier',
        "plugin:@typescript-eslint/recommended-type-checked",
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json", "./tsconfig.node.json"],
        "ecmaFeatures": {
            "jsx": true
        },
        "tsconfigRootDir": __dirname,
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": 0,
    }
}
