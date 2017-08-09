export default {
  data() {
    return {
      activeCardID: undefined
    }
  },
  methods: {
    activateCard(cardID) {
      this.activeCardID = cardID
    },
    cardClasses(cardID) {
      return {
        active: this.activeCardID === cardID
      }
    }
  }
}
