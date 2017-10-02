<template>
<div class="support-watchout">
  <a :href="link" target="_blank" class="panel d-sm-flex justify-content-around align-items-center" :class="panelClasses">
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
const supportPackages = {
  ask: {
    channel: 'ask',
    link: dataStore.links.support.ask.direct,
    text: [
      '沃草年度巨獻：《給問擂台》',
      '全年十二場，很缺錢，真的很缺。'
    ],
    image: 'pitcher',
    button: '灌溉好專案'
  },
  musou: {
    channel: 'musou',
    link: dataStore.links.support.watchout.custom,
    text: [
      '請支持我們做更多有意義的專題',
      '因為很缺錢，真的很缺。'
    ],
    image: 'farmer_hat',
    button: '支持沃草，成為草民'
  },
  lab: {
    channel: 'lab',
    link: dataStore.links.support.watchout.direct,
    text: [
      '更多法案拆解、議事紀錄分析',
      '需要你的幫助。'
    ],
    image: 'pitcher',
    button: '支持沃草，灌溉議題'
  }
}

import dataStore from '../../lib/dataStore'
export default {
  props: ['supportIsShown', 'supportPackageKey'],
  data() {
    return supportPackages[this.supportPackageKey]
  },
  computed: {
    panelClasses() {
      return ['bg-' + this.channel + '-ninetyfive']
    },
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

    > .text {
      padding: 0.25rem;
      text-align: center;
      @include font-serif;
      font-size: 1.125rem;
      font-weight: bold;
      color: rgba(black, 0.95);
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
          background: rgba(white, 0.65);
          color: black;
        }
      }
    }

    &:hover > .button {
      > .grouping {
        > button {
          background: rgba(white, 0.95);
        }
      }
    }
  }
}
</style>
