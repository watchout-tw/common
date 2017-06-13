<template>
<div id="app">
  <NavigationWithIdentity :isAuthenticated="isAuthenticated" :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown"></ModalAuth>
  <Vote></Vote>
  <FooterStandard></FooterStandard>
</div>
</template>

<script>
import NavigationWithIdentity from './components/Navigation/Identity'
import ModalAuth from './components/Modal/Auth'
import FooterStandard from './components/Footer/Standard'

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
