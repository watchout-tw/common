<template>
<transition name="modal">
  <div id="modal-lost-pwd" class="modal-mask" @keyup.esc="toggleShow">
    <div class="modal-wrapper" @click.self="toggleShow">
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
            <p>我們已經將密碼重設Email寄到剛剛填入的信箱。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import modal from '../../interfaces/modal'

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
    submit() {
      if(this.registrationEmail) {
        // API call here
        this.submitted = true
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
