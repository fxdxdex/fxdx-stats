module.exports = {
    "plugins": ["disable"],
    "processor": "disable/disable",
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    // "plugins": [
    //     "react"
    // ],
    "rules": {
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
