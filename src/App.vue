<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :isAuthenticated.sync="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <Vote></Vote>
  <FooterStandard></FooterStandard>
  <SupportWatchoutStandard v-if="supportIsShown" :supportIsShown.sync="supportIsShown" :supportPackageID="supportPackageID"></SupportWatchoutStandard>
</div>
</template>

<script>
import dataStore from './lib/dataStore'
import NavigationWithIdentity from './components/Navigation/Identity'
import ModalAuth from './components/Modal/Auth'
import FooterStandard from './components/Footer/Standard'
import Vote from './components/Vote'
import SupportWatchoutStandard from './components/SupportWatchout/Standard'

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    FooterStandard,
    Vote,
    SupportWatchoutStandard
  },
  data() {
    return {
      channel: dataStore.channels.park,
      isAuthenticated: false,
      modalAuthIsShown: false,
      supportIsShown: true,
      supportPackageID: 'musou'
    }
  }
}
</script>

<style lang="scss">
@import './styles/resources';
@import './styles/main';
</style>
