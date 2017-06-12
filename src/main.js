// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Auth from './components/Modal/Auth'
import App from './App'

global.$ = window.jQuery = window.$ = require('jquery')
global.Tether = require('tether')
global.Bootstrap = require('bootstrap')

Vue.config.productionTip = false

Vue.component('modal-auth', Auth)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
