<template>
<nav class="navbar sticky-top navbar-light" :class="channel.classes.bg">
  <a class="navbar-brand" :href="channel.links.home"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></a>
</nav>
</template>

<script>
export default {
  name: 'navigation-simple',
  mounted() {
    console.log('#' + this.channel.id);
    console.log('Navigation initiated.');
  },
  data() {
    return {
      channel: this.$parent.$data.channel
    }
  }
}
</script>
