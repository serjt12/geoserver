module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true
    },
    "rules": {
        semi: ["error", "never"],
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "object-curly-newline": ["error", {
        "ObjectExpression": "always",
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }]
  }
}
