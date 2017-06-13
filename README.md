# common

> A common library for all of Watchout Commons.

## How to initialize a Watchout front-end repo with vue-cli

``` bash
# scaffold a new vue project with vue-cli
vue init webpack [project_name]

# add modules to project
npm install node-sass sass-loader --save-dev
npm install path/to/watchout-tw/common --save-dev
npm install jquery tether bootstrap@4.0.0-alpha.6 axios --save
```

## Customize

### `package.json`

```js
{
  scripts: {
    "update": "npm uninstall common; npm i",
    "dev": "node build/dev-server.js",
    "dev+": "npm uninstall common; npm i; node build/dev-server.js",
    ...
  }
}
```

### `/config/index.js`

``` js
module.exports = {
  ...
  dev: {
    ...
    autoOpenBrowser: false
  }
}
```

### `/eslintrc.js`

``` js
module.exports = {
  ...
  rules: {
    ...
    'space-before-function-paren': 0,
    'keyword-spacing': 0,
    'no-new': 0
  }
}
```

## Use common JavaScript libraries

``` js
import $ from 'jquery'
global.$ = window.jQuery = window.$ = require('jquery')
global.Tether = require('tether')
global.Bootstrap = require('bootstrap')
import axios from 'axios'
```

## Use common dataStore

``` js
import dataStore from 'common/src/lib/dataStore'
```

## Use common SCSS resources

> with `<style lang="scss">`

``` css
@import '~common/src/styles/resources';
```

## Build Setup

``` bash
# install dependencies
npm i

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
