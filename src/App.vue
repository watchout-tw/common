<template>
<div id="app">
  <NavigationWithIdentity :channel="channel"></NavigationWithIdentity>
  <ModalAuth v-if="modalAuthIsShown"></ModalAuth>
  <ModalLostPwd v-if="modalLostPwdIsShown"></ModalLostPwd>
  <ModalResetPwd v-if="modalResetPwdIsShown"></ModalResetPwd>
  <ModalIdentity v-if="modalIdentityIsShown"></ModalIdentity>
  <Poll :config="pollSampleConfig"></Poll>
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
import FooterStandard from './components/Footer/Standard'
import Poll from './components/Poll'
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
    FooterStandard,
    Poll,
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
      pollSampleConfig: {
        id: 1,
        type: 'people',
        slug: 'taoyuan-1',
        name: '桃園立委給問嗎',
        question: '這些桃園的立法委員，你想問誰？',
        description: '沃草將會邀請得票數前四位的委員參加九月的《桃園立委給問嗎》。',
        options: [
          {
            id: '鄭運鵬',
            name: '鄭運鵬',
            party: '民進黨',
            district: '桃園市第一選舉區'
          },
          {
            id: '陳賴素美',
            name: '陳賴素美',
            party: '民進黨',
            district: '桃園市第二選舉區'
          },
          {
            id: '陳學聖',
            name: '陳學聖',
            party: '國民黨',
            district: '桃園市第三選舉區'
          },
          {
            id: '鄭寶清',
            name: '鄭寶清',
            party: '民進黨',
            district: '桃園市第四選舉區'
          },
          {
            id: '呂玉玲',
            name: '呂玉玲',
            party: '國民黨',
            district: '桃園市第五選舉區'
          },
          {
            id: '趙正宇',
            name: '趙正宇',
            party: '無黨籍',
            district: '桃園市第六選舉區'
          },
          {
            id: '吳志揚',
            name: '吳志揚',
            party: '國民黨',
            district: '全國不分區'
          }
        ],
        related_event: {
          id: 16,
          type: 'physical',
          name: '桃園立委給問嗎',
          link: 'https://ask.watchout.tw',
          participation_link: 'https://ask.watchout.tw'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/resources';
@import './styles/main';
</style>
