<template>
<transition name="modal">
  <div class="modal-auth modal-mask">
    <div class="modal-wrapper" @click.self="toggleModalAuth">
      <div class="modal-dialog">
        <div class="accordion" id="modal-auth-accordion">
          <div class="card">
            <a class="card-head" data-toggle="collapse" href="#form-join" data-parent="#modal-auth-accordion">
              <h4>成為草民</h4>
            </a>
            <div class="card-body collapse show" id="form-join">
              <div class="padding">
                <div class="field d-flex justify-content-between align-items-end"><input type="text" name="id" placeholder="草民代號" style="width: 12.5rem;" /><button class="park small">隨機</button></div>
                <div class="field"><input type="email" name="email" placeholder="Email" class="full-width" /></div>
                <div class="field"><input type="password" name="password" placeholder="密碼" class="full-width" /></div>
                <div class="field d-flex justify-content-between align-items-center">
                  <button class="park" v-on:click="register">註冊</button><label class="form-check-label"><input type="checkbox" class="park"><span>我同意使用條款</span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="card dark">
            <a class="card-head" data-toggle="collapse" href="#form-login" data-parent="#modal-auth-accordion">
              <label class="text-color-park">已經有帳號了？</label>
              <h4>草民登入</h4>
            </a>
            <div class="card-body collapse" id="form-login">
              <div class="padding">
                <div class="field"><input type="text" name="id-or-email" v-model="account" placeholder="草民代號或Email" class="full-width" /></div>
                <div class="field"><input type="password" name="password" v-model="password" placeholder="密碼" class="full-width" /></div>
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
      account: undefined,
      password: undefined
    }
  },
  methods: {
    toggleModalAuth: function() {
      this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
    },
    register: function() {

    },
    login: function() {
      if (!this.account || !this.password) {
        alert('plz enter account n password')
        return
      }
      // Should create a RESTful service to handle
      var loginObj = /^.+@.+$/.test(this.account) ? { email: this.account } : { handle: this.account }
      loginObj.password = this.password
      axios.post('/login', loginObj).then(response => {
        localStorage.setItem('watchout-token', response.data.token)
        this.$emit('update:isAuthenticated', true)
        this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
      }, response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

.modal-auth {
  .accordion > .card {
    background: rgba($color-park, 0.16);
    &.dark {
      background: rgba($color-park, 0.32);
    }
  }
}
</style>
