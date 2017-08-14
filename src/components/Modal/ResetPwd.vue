<template>
<transition name="modal">
  <div id="modal-reset-pwd" class="modal-mask" @keyup.esc="toggleShow">
    <div class="modal-wrapper" @click.self="toggleShow">
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
import modal from '../../interfaces/modal'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

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
            console.log(response)
            this.submitted = true
          }).catch(error => {
            this.clearInputFields()
            console.error(error)
            console.log(error.response.data)
            alert(error.response.data.message)
          })
        } else {
          alert('你必須輸入兩次一致的新密碼')
        }
      } else {
        alert('你的token呢？')
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
