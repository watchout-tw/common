import Hello from './components/Hello.vue'
import NavigationSimple from './components/Navigation/Simple.vue'

const Common = {
  install (Vue, options) {
    Vue.component('hello', Hello)
    Vue.component('navigationsimple', NavigationSimple)
  }
}

export default Common
