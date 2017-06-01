<template>
<nav class="navbar sticky-top navbar-light" :class="channel.classes.bg">
  <a class="navbar-brand" :href="channel.links.home"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></a>
  <a class="navbar-button" id="navbar-identity" @click="promptAuth">Login</a>
</nav>
</template>

<script>
export default {
  name: 'navigation-with-identity',
  mounted() {
    console.log('#' + this.channel.id);
    console.log('Navigation with identity initiated.');
  },
  data() {
    return {
      channel: this.$parent.$data.channel
    }
  },
  methods: {
    promptAuth() {
      var $ = global.$
      $('#modal-auth').modal('show')
    }
  }
}
</script>

<style lang="scss">
.navbar-button {
  display: block;
  width: 60px;
  height: 64px;
  &:hover {
    background: rgba(white, 0.25);
  }
}
#navbar-identity {
  position: absolute;
  right: 0;
}
</style>
