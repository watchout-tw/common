<template>
<nav class="navbar sticky-top d-flex flex-row" :class="channel.classes.bg">
  <router-link class="navbar-brand" :class="channelButtonClasses" :to="{ path: '/' }"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></router-link>
</nav>
</template>

<script>
export default {
  name: 'navigation-simple',
  mounted() {
    console.log('#' + this.channel.id)
    console.log('Navigation initiated.')
  },
  data() {
    return {
      channel: this.$parent.$data.channel
    }
  }
}
</script>
