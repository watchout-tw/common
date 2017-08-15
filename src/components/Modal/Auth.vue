<template>
<transition name="modal">
  <div id="modal-auth" class="modal-mask" @keyup.esc="toggleShow">
    <div class="modal-wrapper" @click.self="toggleShow">
      <div class="modal-dialog">
        <div class="before accordion" v-if="!joinSuccessful && !loginSuccessful">
          <div class="card" :class="cardClasses('join')">
            <a class="card-head" @click.stop.prevent="activateCard('join')">
              <h3>成為草民</h3>
            </a>
            <div class="card-body" @keyup.enter.prevent="join">
              <div class="field d-flex justify-content-between align-items-end"><input type="text" name="id" placeholder="草民代號" v-model="joinHandle" style="width: 12.5rem;" /><button class="park small floating" @click="generateRandomHandle">隨機</button></div>
              <div class="field"><input type="email" name="email" v-model="joinEmail" placeholder="Email" class="full-width" /></div>
              <div class="field"><input type="password" name="password" v-model="joinPassword" placeholder="密碼" class="full-width" /></div>
              <div class="field d-flex justify-content-between align-items-center">
                <button class="park floating" @click="join">註冊</button><label class="form-check-label"><input type="checkbox" class="park" v-model="iAgree"><span>我同意<a class="a-text" href="https://watchout.tw/tos" target="_blank">使用條款</a></span></label>
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
          <div v-if="joinSuccessful" class="paragraphs tight">
            <p>請收信，並按照信件中的步驟啟動認證流程</p>
          </div>
          <div v-if="loginSuccessful" class="paragraphs tight">
            <p>歡迎回到沃草共有地</p>
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
      joinSuccessful: false,
      loginSuccessful: false,
      toggleShowAfter: 3500
    }
  },
  computed: {
    activeCardID() {
      return this.$store.state.modalAuthActiveCard
    }
  },
  methods: {
    clearInputFields() {
      this.loginPassword = undefined
      this.joinPassword = undefined
    },
    onJoinSuccessful(response) {
      this.joinSuccessful = true
      this.toggleShowSchedule = setTimeout(this.toggleShow, this.toggleShowAfter)
    },
    onLoginSuccessful(response) {
      this.loginSuccessful = true
      localStorage.setItem('watchout-token', response.data.token)
      localStorage.setItem('watchout-citizen-handle', response.data.handle)
      util.authenticateAxios()
      this.$store.dispatch('toggleIsAuthenticated', {
        value: true
      })
      this.toggleShowSchedule = setTimeout(this.toggleShow, this.toggleShowAfter)
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
      this.joinHandle = nameGenerator({ words: Math.ceil(Math.random() * 3) + 1 }).raw.join('_')
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
        alert(error.response.data.message)
      })
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
    > .field:last-of-type {
      padding-bottom: 1rem;
    }
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
}
</style>
