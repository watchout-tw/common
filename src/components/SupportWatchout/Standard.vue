<template>
<div class="support-watchout">
  <a :href="link" class="panel d-sm-flex justify-content-around align-items-center">
    <div class="text">
      <p v-for="line in text">{{ line }}</p>
    </div>
    <div class="button">
      <div class="grouping">
        <img :src="imageURL"/>
        <button>{{ button }}</button>
      </div>
    </div>
    <div class="close white" @click.stop.prevent="close"></div>
  </a>
</div>
</template>

<script>
import dataStore from '../../lib/dataStore'
export default {
  props: ['supportIsShown'],
  data() {
    return {
      link: dataStore.links.support,
      text: [
        '給問擂台，沃草2017年度巨獻',
        '全年12場，hen缺錢，真的hen缺'
      ],
      image: 'pitcher',
      button: '灌溉好專案'
    }
  },
  computed: {
    imageURL() {
      return require('./assets/' + this.image + '.png')
    }
  },
  methods: {
    close() {
      this.$emit('update:supportIsShown', false)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

$background-color: $color-ask;

.support-watchout {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: $z-fixed;

  > .panel {
    @include shadow;
    position: relative;
    display: block;
    width: 100%;
    max-width: $bp-sm;
    padding: 0.75rem 1rem;
    margin: 0 auto;
    background-color: rgba($background-color, 0.95);

    > .text {
      padding: 0.25rem;
      text-align: center;
      font-size: 1.125rem;
      color: rgba(white, 0.95);
      > p {
        margin: 0.25rem 0;
        line-height: 1.25;
      }
      @include bp-sm-up {
        text-align: left;
      }
    }
    > .button {
      padding: 0.5rem;
      text-align: center;

      > .grouping {
        position: relative;
        display: inline-block;

        > img {
          position: absolute;
          top: -0.5rem;
          left: -1rem;
          width: 42px;
        }
        > button {
          border: none;
          border-radius: 1.5rem;
          padding: 0.75rem 2.5rem;
          font-size: 1rem;
          line-height: 1;
          background: white;
          color: $background-color;
        }
      }
    }
  }
}
</style>
