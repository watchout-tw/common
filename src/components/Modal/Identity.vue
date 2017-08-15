<template>
<transition name="modal">
  <div id="modal-identity" class="modal-mask" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
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
import modal from '../../interfaces/modal'

export default {
  mixins: [modal],
  data() {
    return {
      modal: {
        key: 'Identity'
      }
    }
  },
  computed: {
    handle() {
      return localStorage.getItem('watchout-citizen-handle')
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
