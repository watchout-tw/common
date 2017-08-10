<template>
<transition name="modal">
  <div id="modal-identity" class="modal-mask">
    <div class="modal-wrapper" @click.self="toggleShow">
      <div class="modal-dialog">
        <div class="content">
          Hello <strong>{{ handle }}</strong> 🖖
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
  computed: {
    handle() {
      return localStorage.getItem('watchout-citizen-handle')
    }
  },
  methods: {
    toggleShow() {
      this.$store.dispatch('toggleModalIdentity', {
        value: !this.$store.state.modalIdentityIsShown
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-identity {
  .content {
    background: rgba($color-park, 0.32);
    padding: 1rem;
  }
}
</style>
