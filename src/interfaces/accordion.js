export default {
  data() {
    // FIXME: activeCardID should be part of this interface?
  },
  methods: {
    activateCard(cardID) {
      if(this.accordion.store) {
        this.$store.dispatch(`toggle${this.accordion.key}ActiveCard`, {
          value: cardID
        })
      } else {
        this.activeCardID = cardID
      }
    },
    cardClasses(cardID) {
      return {
        active: this.activeCardID === cardID
      }
    }
  }
}
