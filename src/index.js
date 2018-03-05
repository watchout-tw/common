import NavigationWithIdentity from '~/src/component/Hello'

const Common = {
  install (Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true
    this.params = params

    Vue.component('hello', Hello)
  }
}

export default Common
