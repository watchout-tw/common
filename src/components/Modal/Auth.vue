<template>
<transition name="modal">
  <div id="modal-auth" class="modal-mask" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
      <div class="modal-dialog">
        <div class="before accordion" v-if="!verificationEmailSent && !loginSuccessful && !requireEmailVerification">
          <div class="card" :class="cardClasses('join')">
            <a class="card-head" @click.stop.prevent="activateCard('join')">
              <h3>成為草民</h3>
            </a>
            <div class="card-body" @keyup.enter.prevent="join">
              <div class="field d-flex justify-content-between align-items-end"><input type="text" name="id" placeholder="草民代號" v-model="joinHandle" style="width: 12.5rem;" /><button class="park small floating" @click="generateRandomHandle">隨機</button></div>
              <div class="note">草民代號是你在沃草共有地的身份識別，無法更改，請謹慎選擇。你可以使用A-Z、a-z（大小寫不同）、0-9、底線（_）以及連字號（-）。</div>
              <div class="field"><input type="email" name="email" v-model="joinEmail" placeholder="Email" class="full-width" /></div>
              <div class="field"><input type="password" name="password" v-model="joinPassword" placeholder="密碼" class="full-width" /></div>
              <div class="field d-flex justify-content-between align-items-center">
                <button class="park floating" @click="join">註冊</button><label class="form-check-label"><input type="checkbox" class="park" v-model="iAgree"><span>我同意<a class="a-text" href="#" @click.stop.prevent="showToS">使用條款</a></span></label>
              </div>
            </div>
          </div>
          <div class="card dark" :class="cardClasses('login')">
            <a class="card-head" @click.stop.prevent="activateCard('login')">
              <label class="text-color-park">已經有帳號了？</label>
              <h3>草民登入</h3>
            </a>
            <div class="card-body" @keyup.enter.prevent="login">
              <div class="field"><input type="text" name="id-or-email" v-model="loginAccount" placeholder="草民代號或Email" class="full-width" /></div>
              <div class="field"><input type="password" name="password" v-model="loginPassword" placeholder="密碼" class="full-width" /></div>
              <div class="field"><button class="park floating" @click="login">登入</button></div>
            </div>
          </div>
          <div class="card dark active">
            <div class="card-body">
              <label class="text-color-park"><a class="a-text" href="#" @click.prevent="showLostPwd">我忘記密碼了⋯</a></label>
              <label class="text-color-park"><a class="a-text" href="#" @click.prevent="showFacebookLogin">你在找Facebook登入嗎？</a></label>
            </div>
          </div>
        </div>
        <div class="after" v-else>
          <div v-if="verificationEmailSent" class="paragraphs tight">
            <p>請收信，並按照信件中的步驟啟動認證流程</p>
          </div>
          <div v-if="loginSuccessful" class="paragraphs tight">
            <p>歡迎回到沃草共有地</p>
          </div>
          <div v-if="requireEmailVerification">
            <p>你的Email尚未通過認證</p>
            <button class="park floating" @click.prevent="requestEmailVerification">重發認證信</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
import * as util from '../../lib/util'
import dataStore from '../../lib/dataStore'
import accordion from '../../interfaces/accordion'
import modal from '../../interfaces/modal'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

const nameGenerator = require('project-name-generator')

const DEFAULT = 0
const VERIF_EMAIL_SENT = 1
const LOGIN_SUCCESS = 2
const REQUIRE_EMAIL_VERIF = 3

export default {
  name: 'modal-auth',
  mixins: [accordion, modal],
  data() {
    return {
      modal: {
        key: 'Auth'
      },
      accordion: {
        store: true,
        key: 'ModalAuth'
      },
      dataStore: dataStore,
      loginAccount: undefined,
      loginPassword: undefined,
      joinEmail: undefined,
      joinHandle: undefined,
      joinPassword: undefined,
      iAgree: false,
      status: DEFAULT,
      emailVerificationRequestLink: undefined
    }
  },
  computed: {
    activeCardID() {
      return this.$store.state.modalAuthActiveCard
    },
    verificationEmailSent: {
      get: function() {
        return this.status === VERIF_EMAIL_SENT
      },
      set: function(newValue) {
        if(newValue) {
          this.status = VERIF_EMAIL_SENT
        }
      }
    },
    loginSuccessful: {
      get: function() {
        return this.status === LOGIN_SUCCESS
      },
      set: function(newValue) {
        if(newValue) {
          this.status = LOGIN_SUCCESS
        }
      }
    },
    requireEmailVerification: {
      get: function() {
        return this.status === REQUIRE_EMAIL_VERIF
      },
      set: function(newValue) {
        if(newValue) {
          this.status = REQUIRE_EMAIL_VERIF
        }
      }
    },
    handle() {
      return localStorage.getItem('watchout-citizen-handle')
    }
  },
  methods: {
    clearInputFields() {
      this.loginPassword = undefined
      this.joinPassword = undefined
    },
    onJoinSuccessful(response) {
      this.verificationEmailSent = true
      this.hideAfter(3500)
    },
    onLoginSuccessful(response) {
      this.loginSuccessful = true
      localStorage.setItem('watchout-token', response.data.token)
      localStorage.setItem('watchout-citizen-handle', response.data.handle)
      localStorage.setItem('watchout-citizen-roles', util.makeCitizenRoleString(response.data.roles))

      util.authenticateAxios()
      util.getCitizen(this.$store)

      this.$store.dispatch('toggleIsAuthenticated', {
        value: true
      })
      this.hideAfter(2500)
    },
    showToS() {
      this.$store.dispatch('toggleModalTermsOfSvc', {
        value: true
      })
    },
    showLostPwd() {
      this.$store.dispatch('toggleModalAuth', {
        value: false
      })
      this.$store.dispatch('toggleModalLostPwd', {
        value: true
      })
    },
    showFacebookLogin() {
      alert('什麼是Facebook？')
    },
    generateRandomHandle(event) {
      this.joinHandle = nameGenerator({ words: Math.ceil(Math.random() * 2) + 1 }).raw.join('_')
    },
    join(event) {
      if(!(this.joinEmail && this.joinHandle && this.joinPassword)) {
        alert('你必須填寫草民代號、Email及密碼')
        return
      }
      if(!this.iAgree) {
        alert('你必須同意使用條款')
        return
      }
      let citizen = {
        handle: this.joinHandle,
        password: this.joinPassword,
        email: this.joinEmail
      }
      axios.post('/auth/join', citizen).then(response => {
        this.onJoinSuccessful(response)
      }).catch(error => {
        this.clearInputFields()
        util.handleThatError(error)
        alert(error.response.data.message)
      })
    },
    login() {
      if(!(this.loginAccount && this.loginPassword)) {
        alert('請輸入草民代號及密碼')
        return
      }
      // Should create a RESTful service to handle
      var loginObj = /^.+@.+$/.test(this.loginAccount) ? { email: this.loginAccount } : { handle: this.loginAccount }
      loginObj.password = this.loginPassword
      axios.post('/auth/login', loginObj).then(response => {
        this.onLoginSuccessful(response)
      }).catch(error => {
        this.clearInputFields()
        util.handleThatError(error)
        if(error.response.data.message.indexOf('未認證') > -1 && error.response.data.link) {
          this.emailVerificationRequestLink = error.response.data.link.replace(axios.defaults.baseURL, '')
          this.requireEmailVerification = true
        } else {
          alert(error.response.data.message)
        }
      })
    },
    requestEmailVerification() {
      if(this.emailVerificationRequestLink) {
        axios.get(this.emailVerificationRequestLink).then(response => {
          this.verificationEmailSent = true
          this.hideAfter(3500)
        }).catch(util.handleThatError)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

.accordion > .card {
  > .card-body {
    max-height: 0;
    overflow: hidden;
  }
  &.active {
    padding-bottom: 1rem;
    > .card-head {
      padding-bottom: 0.5rem;
    }
    > .card-body {
      max-height: none;
    }
  }
}

#modal-auth {
  .before.accordion > .card {
    background: rgba($color-park, 0.16);
    &.dark {
      background: rgba($color-park, 0.32);
    }
  }
  .after {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
  .note {
    font-size: 0.75rem;
    color: $color-secondary-text-grey;
  }
  .field:last-of-type {
    padding-bottom: 0.25rem;
  }
}
</style>
