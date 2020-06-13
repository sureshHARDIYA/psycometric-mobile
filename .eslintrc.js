module.exports = {
  "extends": "universe/native",
  "rules": {
    "react/jsx-first-prop-new-line": [1, 'multiline'],
    "react/jsx-max-props-per-line": [1, { "when": "multiline" }],
    "react/jsx-sort-props": [1, {
      "callbacksLast": true,
      "shorthandFirst": true,
      "noSortAlphabetically": true,
    }]
  }
};
