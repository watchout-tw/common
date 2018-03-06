import Hello from './components/Hello.vue'

const Common = {
  install (Vue, options) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.component('hello', Hello)
  }
}

export default Common
