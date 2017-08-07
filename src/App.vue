<template>
<div id="app">
  <NavigationWithIdentity :channel="channel" :isAuthenticated.sync="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown" :isAuthenticated.sync="isAuthenticated"></ModalAuth>
  <Poll></Poll>
  <FooterStandard></FooterStandard>
  <SupportWatchoutStandard v-if="supportIsShown" :supportIsShown.sync="supportIsShown" :supportPackageID="supportPackageID"></SupportWatchoutStandard>
</div>
</template>

<script>
import * as util from './lib/util'
import dataStore from './lib/dataStore'
import NavigationWithIdentity from './components/Navigation/Identity'
import ModalAuth from './components/Modal/Auth'
import FooterStandard from './components/Footer/Standard'
import Poll from './components/Poll'
import SupportWatchoutStandard from './components/SupportWatchout/Standard'

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    FooterStandard,
    Poll,
    SupportWatchoutStandard
  },
  data() {
    return {
      channel: dataStore.channels.park,
      isAuthenticated: util.jwtTokenIsExist(),
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
