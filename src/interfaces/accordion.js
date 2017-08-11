export default {
  data() {
    // FIXME: activeCardID should be part of this interface?
  },
  methods: {
    activateCard(cardID) {
      this.$store.dispatch('toggleModalAuthActiveCard', {
        value: cardID
      })
    },
    cardClasses(cardID) {
      return {
        active: this.activeCardID === cardID
      }
    }
  }
}
