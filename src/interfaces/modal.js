export default {
  // require this.key in data()
  data() {
    return {
      toggleShowSchedule: undefined
    }
  },
  methods: {
    toggleShow() {
      if(this.toggleShowSchedule) {
        clearTimeout(this.toggleShowSchedule)
        this.toggleShowSchedule = undefined
      }
      this.$store.dispatch(`toggleModal${this.modal.key}`, {
        value: !this.$store.state[`modal${this.modal.key}IsShown`]
      })
    }
  }
}
