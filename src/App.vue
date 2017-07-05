<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :isAuthenticated.sync="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <Vote></Vote>
  <FooterStandard></FooterStandard>
</div>
</template>

<script>
import dataStore from '@/lib/dataStore'
import NavigationWithIdentity from '@/components/Navigation/Identity'
import ModalAuth from '@/components/Modal/Auth'
import FooterStandard from '@/components/Footer/Standard'
import Vote from './components/Vote'

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    FooterStandard,
    Vote
  },
  data() {
    return {
      channel: dataStore.channels.park,
      isAuthenticated: false,
      modalAuthIsShown: false
    }
  }
}
</script>

<style lang="scss">
@import 'styles/resources';
@import 'styles/main';
</style>
