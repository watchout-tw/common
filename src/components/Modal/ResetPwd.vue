<template>
<transition name="modal">
  <div id="modal-reset-pwd" class="modal-mask">
    <div class="modal-wrapper" @click.self="toggleShow">
      <div class="modal-dialog">
        <form class="before" v-if="!submitted">
          <h3>重新設定密碼</h3>
          <div class="paragraphs small">
            <p class="note">這次不要再忘記囉。</p>
          </div>
          <div class="field"><input type="password" name="new-password" v-model="newPassword" placeholder="新密碼" class="full-width" /></div>
          <div class="field"><input type="password" name="confirm-password" v-model="confirmPassword" placeholder="確認密碼" class="full-width" /></div>
          <div class="field"><button class="park floating" @click="submit">設定密碼</button></div>
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
    submit() {
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
