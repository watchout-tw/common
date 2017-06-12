<template>
<div>
  <nav class="navbar sticky-top navbar-light" :class="channel.classes.bg">
    <a class="navbar-brand" :href="channel.links.home"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></a>
    <a class="navbar-button" :class="isAuthenticated ? 'identity-citizen' : 'identity-anon'" id="navbar-identity" @click="toggleModalAuth"></a>
  </nav>
</div>
</template>

<script>
import dataStore from '../../lib/dataStore'

var currentChannel = dataStore.channels.park

export default {
  name: 'navigation-with-identity',
  props: ['isAuthenticated', 'modalAuthIsShown'],
  mounted() {
    console.log('#' + this.channel.id)
    console.log('Navigation with identity initiated.')
  },
  data() {
    return {
      channel: currentChannel
    }
  },
  methods: {
    toggleModalAuth() {
      this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

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
  top: 0;
  right: 0;
  background-size: contain;

  &.identity-anon {
    background-image: url(assets/identity/robot.png);
  }
  &.identity-citizen {
    background-image: url(assets/identity/human.png);
  }
}
</style>
