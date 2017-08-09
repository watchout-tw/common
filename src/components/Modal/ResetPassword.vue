<template>
<transition name="modal">
  <div id="modal-reset-password" class="modal-mask">
    <div class="modal-wrapper" @click.self="toggleShow">
      <div class="modal-dialog">
        <div class="before" v-if="!submitted">
          <h3>忘記密碼了嗎？</h3>
          <div class="pg small">
            <p class="note">請回想成為草民時填入的Email。</p>
          </div>
          <div class="field"><input type="email" name="email" v-model="registrationEmail" placeholder="Email" class="full-width" /></div>
          <div class="field"><button class="park"@click="submit">重設密碼</button></div>
        </div>
        <div class="after" v-else>
          <div class="pg tight">
            <p>我們已經將密碼重設Email寄到剛剛填入的信箱。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  data() {
    return {
      registrationEmail: undefined,
      submitted: false
    }
  },
  methods: {
    toggleShow() {
      this.$store.dispatch('toggleModalResetPassword', {
        value: !this.$store.state.modalResetPasswordIsShown
      })
    },
    submit() {
      if(this.registrationEmail) {
        // API call here
        this.submitted = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-reset-password {
  .before,
  .after {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
}
</style>
