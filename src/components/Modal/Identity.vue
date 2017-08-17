<template>
<transition name="modal">
  <div id="modal-identity" class="modal-mask" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
      <div class="modal-dialog">
        <div class="before" v-if="!loggedOut">
          <div class="paragraphs first">
            <p>😀 {{ handle }}</p>
            <p v-if="firstEmail">📬 {{ firstEmail }}</p>
          </div>
          <button class="park floating" @click.stop="logout">登出</button>
        </div>
        <div class="after" v-else>
          <div class="paragraphs first last">
            <p>Live long and prosper. 🖖</p>
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
        key: 'Identity'
      },
      loggedOut: false
    }
  },
  computed: {
    handle() {
      return localStorage.getItem('watchout-citizen-handle')
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    firstEmail() {
      return localStorage.getItem('watchout-citizen-first-email')
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('toggleIsAuthenticated', {
        value: false
      })
      localStorage.clear()
      this.loggedOut = true
      this.hideAfter(2500)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-identity {
  .before,
  .after {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
}
</style>
