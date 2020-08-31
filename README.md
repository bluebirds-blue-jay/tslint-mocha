# tslint-mocha

UPDATE: Project is abandoned because TSLint is being replaced by ESLint + plugins.

This package provides a TSLint rule that help to enforce some best practices when using Mocha test runner.

## Supported rules

* `mocha-no-only` - to avoid using `it.only()` or similar methods.

## How to install

* Run `npm install --save-dev tslint-mocha`
* Add to your `tslint.json` file:

```json
  "rules": {
    "mocha-no-only": true
  },
  "rulesDirectory": [
    "tslint-mocha"
  ]
```

## Status

[![Build Status](https://travis-ci.org/Litee/tslint-mocha.png)](https://travis-ci.org/Litee/tslint-mocha)
