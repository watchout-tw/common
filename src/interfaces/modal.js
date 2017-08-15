export default {
  // require this.key in data()
  data() {
    return {
      toggleShowSchedule: undefined
    }
  },
  methods: {
    toggleShow(show) {
      if(this.toggleShowSchedule) {
        clearTimeout(this.toggleShowSchedule)
        this.toggleShowSchedule = undefined
      }
      if(!show) {
        show = !this.$store.state[`modal${this.modal.key}IsShown`]
      }
      this.$store.dispatch(`toggleModal${this.modal.key}`, {
        value: show
      })
    },
    hide() {
      this.toggleShow(false)
    },
    hideAfter(time) {
      this.toggleShowSchedule = setTimeout(this.hide, time)
    }
  }
}
