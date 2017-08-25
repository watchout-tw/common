<template>
<transition name="modal">
  <div id="modal-reset-pwd" class="modal-mask" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
      <div class="modal-dialog">
        <form class="before" v-if="!submitted" @submit.prevent="submit">
          <h3>重新設定密碼</h3>
          <div class="paragraphs small">
            <p class="note">這次不要再忘記囉。</p>
          </div>
          <div class="field"><input type="password" name="new-password" v-model="newPassword" placeholder="新密碼" class="full-width" /></div>
          <div class="field"><input type="password" name="confirm-password" v-model="confirmPassword" placeholder="確認密碼" class="full-width" /></div>
          <div class="field"><button class="park floating">設定密碼</button></div>
        </form>
        <div class="after" v-else>
          <div class="paragraphs tight">
            <p>密碼設定完成。</p>
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
import modal from '../../interfaces/modal'

export default {
  mixins: [modal],
  data() {
    return {
      modal: {
        key: 'ResetPwd'
      },
      newPassword: undefined,
      confirmPassword: undefined,
      submitted: false
    }
  },
  methods: {
    clearInputFields() {
      this.newPassword = undefined
      this.confirmPassword = undefined
    },
    submit() {
      let token = localStorage.getItem('watchout-password-reset-token')
      if(token) {
        if(this.newPassword && this.confirmPassword === this.newPassword) {
          let headers = {
            'Authorization': token
          }
          let data = {
            new_password: this.newPassword
          }
          axios.post('/citizen/reset_password', data, {
            headers
          }).then(response => {
            this.submitted = true
            this.hideAfter(2500)
            this.$router.replace({ query: {} })
          }).catch(error => {
            this.clearInputFields()
            util.handleThatErrorAndAlert(error)
          })
        } else {
          util.sysAlert('park_auth_reset_pwd_input_mismatch')
        }
      } else {
        util.sysAlert('park_auth_token_not_found')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-reset-pwd {
  .before,
  .after {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
}
</style>
