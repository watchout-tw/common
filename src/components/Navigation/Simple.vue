<template>
<nav class="navbar sticky-top navbar-light" :class="channel.classes.bg">
  <a class="navbar-brand" :href="channel.links.home"><img :src="regular" class="logo-type" :style="channel.assets.logoWithType.regular.style"/></a>
</nav>
</template>

<script>
import dataStore from '../../lib/dataStore'

export default {
  name: 'navigation-simple',
  props: ['large', 'small', 'regular'],
  mounted() {
    console.log('#' + this.channel.id)
    console.log('Navigation initiated.')
  },
  data() {
    return {
      // channel: this.$parent.$data.channel
      channel: dataStore.channels.ask
    }
  }
}
</script>
