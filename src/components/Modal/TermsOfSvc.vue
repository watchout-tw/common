<template>
<transition name="modal">
  <div id="modal-tos" class="modal-mask more-transparent wide" @keyup.esc="hide">
    <div class="modal-wrapper" @click.self="hide">
      <div class="modal-dialog">
        <div class="content">
          <div class="tos" v-html="tos"></div>
          <button class="park floating" @click.stop.prevent="hide">我讀完了</button>
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
        key: 'TermsOfSvc'
      },
      tos: require('./assets/Terms-of-Service.md')
    }
  },
  methods: {
    hide() {
      this.$store.dispatch('toggleModalTermsOfSvc', {
        value: false
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

#modal-tos {
  .content {
    background: rgba($color-park, 0.16);
    padding: 1rem;

    > .tos {
      margin-bottom: 1rem;
      max-height: 24rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      @include bp-sm-up {
        padding-right: 0.5rem;
      }

      // FIXME: this is shitty
      font-size: 0.875rem;
      h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      h2, h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
      ol, ul {
        padding-left: 1.25rem;
        margin: 1rem 0;
        > li {
          margin: 0.25rem 0;
        }
      }
    }
  }
}
</style>
