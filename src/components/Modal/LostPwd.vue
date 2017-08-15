<template>
<transition name="modal">
  <div id="modal-lost-pwd" class="modal-mask" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
      <div class="modal-dialog">
        <form class="before" v-if="!submitted" @submit.prevent="submit">
          <h3>忘記密碼了嗎？</h3>
          <div class="paragraphs small">
            <p class="note">請回想成為草民時填入的Email。</p>
          </div>
          <div class="field"><input type="email" name="email" v-model="registrationEmail" placeholder="Email" class="full-width" /></div>
          <div class="field"><button class="park floating">確定</button></div>
        </form>
        <div class="after" v-else>
          <div class="paragraphs tight">
            <p>如果系統中有你剛剛填入的Email，我們已經將信寄出。請收信，並按照信件中的步驟重新設定密碼。</p>
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

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  mixins: [modal],
  data() {
    return {
      modal: {
        key: 'LostPwd'
      },
      registrationEmail: undefined,
      submitted: false
    }
  },
  methods: {
    clearInputFields() {
      this.registrationEmail = undefined
    },
    submit() {
      if(this.registrationEmail && /^.+@.+$/.test(this.registrationEmail)) {
        let body = {
          email: this.registrationEmail
        }
        axios.post('/citizen/request_reset_password', body).then(response => {
          this.submitted = true
          this.hideAfter(2500)
        }).catch(error => {
          this.clearInputFields()
          util.handleThatError(error)
          alert(error.response.data.message)
        })
      } else {
        alert('你必須輸入有效的Email')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-lost-pwd {
  .before,
  .after {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
}
</style>
