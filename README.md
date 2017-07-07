# common

> A common library for all of Watchout Commons.

## How to initialize a Watchout front-end repo with vue-cli

``` bash
# scaffold a new vue project with vue-cli
vue init webpack [project_name]

# add modules to project
npm install node-sass sass-loader --save-dev
npm install jquery tether bootstrap@4.0.0-alpha.6 axios --save
npm install path/to/watchout-tw/common --save-dev
```

## Customize a Watchout front-end repo

### `package.json`

``` js
{
  "scripts": {
    "update": "npm uninstall common; npm i",
    "dev": "node build/dev-server.js",
    "dev+": "npm uninstall common; npm i; node build/dev-server.js",
    ...
  }
}
```

### `/build/webpack.base.conf.js`

``` js
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), // import ... '@/path/to/thing.js'
      '_': resolve('static') // require('_/path/to/img.png')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/common')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000, // increase limit for small images
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      ...
    ]
  }
}
```

### `/config/index.js`

``` js
module.exports = {
  build: {
    assetsPublicPath: './', // for test run on localhost
    ...
  },
  dev: {
    autoOpenBrowser: false,
    ...
  }
}
```

### `/eslintrc.js`

``` js
module.exports = {
  rules: {
    ...
    'space-before-function-paren': 0,
    'keyword-spacing': 0,
    'no-new': 0
  }
}
```

## Use common in a Watchout front-end repo

### JavaScript libraries

``` js
import $ from 'jquery'
global.$ = window.jQuery = window.$ = require('jquery')
global.Tether = require('tether')
global.Bootstrap = require('bootstrap')

import axios from 'axios'
```

### Common dataStore

``` js
import dataStore from 'common/src/lib/dataStore'
```

### Common SCSS resources

> with `<style lang="scss">`

``` css
@import '~common/src/styles/resources';
```

## How to build & test common resources in this repo

``` bash
# install dependencies
npm i

# serve with hot reload at localhost:4200
npm run dev

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
