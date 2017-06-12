<template>
<div id="app">
  <NavigationWithIdentity :modalAuthIsShown.sync="modalAuthIsShown"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown" :modalAuthIsShown.sync="modalAuthIsShown"></ModalAuth>
  <FooterStandard></FooterStandard>
</div>
</template>

<script>
import NavigationWithIdentity from './components/Navigation/Identity'
import ModalAuth from './components/Modal/Auth'
import FooterStandard from './components/Footer/Standard'

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    FooterStandard
  },
  data() {
    return {
      modalAuthIsShown: false
    }
  }
}
</script>

<style lang="scss">
@import 'styles/resources';
@import 'styles/main';
</style>
