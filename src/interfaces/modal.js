export default {
  // require this.key in data()
  methods: {
    toggleShow() {
      this.$store.dispatch(`toggleModal${this.modal.key}`, {
        value: !this.$store.state[`modal${this.modal.key}IsShown`]
      })
    }
  }
}
