<template>
<transition name="modal">
  <div id="modal-auth" class="modal-mask">
    <div class="modal-wrapper" @click.self="toggleModalAuth">
      <div class="modal-dialog">
        <div class="accordion" id="modal-auth-accordion">
          <div class="card">
            <a class="card-head" @click.stop.prevent data-toggle="collapse" href="#form-join" data-parent="#modal-auth-accordion">
              <h4>成為草民</h4>
            </a>
            <div class="card-body collapse show" id="form-join">
              <div class="padding">
                <div class="field d-flex justify-content-between align-items-end"><input type="text" name="id" placeholder="草民代號" v-model="joinHandle" style="width: 12.5rem;" /><button class="park small">隨機</button></div>
                <div class="field"><input type="email" name="email" v-model="joinEmail" placeholder="Email" class="full-width" /></div>
                <div class="field"><input type="password" name="password" v-model="joinPassword" placeholder="密碼" class="full-width" /></div>
                <div class="field d-flex justify-content-between align-items-center">
                  <button class="park" v-on:click="register">註冊</button><label class="form-check-label"><input type="checkbox" class="park" v-model="iAgree"><span>我同意<a class="a-text" href="https://watchout.tw/tos" target="_blank">使用條款</a></span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="card dark">
            <a class="card-head" @click.stop.prevent data-toggle="collapse" href="#form-login" data-parent="#modal-auth-accordion">
              <label class="text-color-park">已經有帳號了？</label>
              <h4>草民登入</h4>
            </a>
            <div class="card-body collapse show" id="form-login">
              <div class="padding">
                <div class="field"><input type="text" name="id-or-email" v-model="loginAccount" placeholder="草民代號或Email" class="full-width" /></div>
                <div class="field"><input type="password" name="password" v-model="loginPassword" placeholder="密碼" class="full-width" /></div>
                <div class="field"><button class="park" v-on:click="login">登入</button></div>
              </div>
            </div>
          </div>
          <div class="card dark">
            <div class="card-body">
              <div class="padding">
                <label class="text-color-park">我忘記密碼了。</label>
                <label class="text-color-park">你在找Facebook登入嗎？</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
import dataStore from '../../lib/dataStore'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  name: 'modal-auth',
  props: ['modalAuthIsShown', 'isAuthenticated'],
  data() {
    return {
      dataStore: dataStore,
      loginAccount: undefined,
      loginPassword: undefined,
      joinEmail: undefined,
      joinHandle: undefined,
      joinPassword: undefined,
      iAgree: false
    }
  },
  methods: {
    toggleModalAuth () {
      this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
    },
    register () {
      if (!this.iAgree) {
        alert('請同意使用條款')
        return
      }
      if (!this.joinEmail || !this.joinHandle || !this.joinPassword) {
        alert('帳號、密碼、Email 請勿留空')
        return
      }
      var newWatchouter = {
        handle: this.joinHandle,
        password: this.joinPassword,
        email: this.joinEmail
      }
      axios.post('/auth/join', newWatchouter).then(response => {
        alert(response.data.message)
      }).catch(error => {
        console.log(error)
        alert('註冊錯誤，請稍後再試')
      })
    },
    login () {
      if (!this.loginAccount || !this.loginPassword) {
        alert('請輸入帳號、密碼')
        return
      }
      // Should create a RESTful service to handle
      var loginObj = /^.+@.+$/.test(this.loginAccount) ? { email: this.loginAccount } : { handle: this.loginAccount }
      loginObj.password = this.loginPassword
      axios.post('/auth/login', loginObj).then(response => {
        localStorage.setItem('watchout-token', response.data.token)
        this.$emit('update:isAuthenticated', true)
        this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-auth {
  .accordion > .card {
    background: rgba($color-park, 0.16);
    &.dark {
      background: rgba($color-park, 0.32);
    }
  }
}
</style>
