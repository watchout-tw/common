<template>
<div id="app">
  <NavigationWithIdentity :channel="channel"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown"></ModalAuth>
  <ModalLostPwd v-if="modalLostPwdIsShown"></ModalLostPwd>
  <ModalResetPwd v-if="modalResetPwdIsShown"></ModalResetPwd>
  <ModalIdentity v-if="modalIdentityIsShown"></ModalIdentity>
  <ModalTermsOfSvc v-if="modalTermsOfSvcIsShown"></ModalTermsOfSvc>
  <FooterStandard></FooterStandard>
  <SupportWatchoutStandard v-if="supportIsShown" :support-is-shown.sync="supportIsShown" :support-package-key="supportPackageKey"></SupportWatchoutStandard>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import dataStore from './lib/dataStore'
import NavigationWithIdentity from './components/Navigation/Identity'
import ModalAuth from './components/Modal/Auth'
import ModalLostPwd from './components/Modal/LostPwd'
import ModalResetPwd from './components/Modal/ResetPwd'
import ModalIdentity from './components/Modal/Identity'
import ModalTermsOfSvc from './components/Modal/TermsOfSvc'
import FooterStandard from './components/Footer/Standard'
import SupportWatchoutStandard from './components/SupportWatchout/Standard'
import * as util from './lib/util'

Vue.use(Vuex)

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    ModalAuth,
    ModalLostPwd,
    ModalResetPwd,
    ModalIdentity,
    ModalTermsOfSvc,
    FooterStandard,
    SupportWatchoutStandard
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    modalAuthIsShown() {
      return this.$store.state.modalAuthIsShown
    },
    modalLostPwdIsShown() {
      return this.$store.state.modalLostPwdIsShown
    },
    modalResetPwdIsShown() {
      return this.$store.state.modalResetPwdIsShown
    },
    modalIdentityIsShown() {
      return this.$store.state.modalIdentityIsShown
    },
    modalTermsOfSvcIsShown() {
      return this.$store.state.modalTermsOfSvcIsShown
    }
  },
  beforeMount() {
    this.$store.dispatch('toggleIsAuthenticated', {
      value: util.jwtTokenIsHere()
    })
  },
  data() {
    return {
      channel: dataStore.channels.park,
      supportIsShown: true,
      supportPackageKey: 'musou',
      menuSample: []
    }
  }
}
</script>

<style lang="scss">
@import './styles/resources';
@import './styles/main';
</style>
