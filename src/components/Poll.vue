<template>
<div class="poll" :class="pollClasses">
  <h1 class="small">{{ config.name }}</h1>
  <div class="pg">
    <p>{{ config.question }}</p>
  </div>
  <div class="options d-flex flex-wrap">
    <div v-for="option in config.options" :key="option.id" class="option" :class="optionClasses(option.id)" @click="handleSelect(option.id)">
      <div class="image" :style="optionImageStyle(option.id)"></div>
      <div class="select"></div>
      <div class="party-flag"><div class="flag" :style="flagStyle(option.party)"></div></div>
      <div class="name">{{ option.name }}</div>
    </div>
  </div>
  <div class="submit" v-if="isAuthenticated && !ballotCasted">
    <div class="pg center small">
      <p class="note">請想清楚再投票，送出後無法更改。</p>
    </div>
    <button class="park" @click="castBallot">投下你的一票</button>
  </div>
  <div class="login-prompt" v-if="!isAuthenticated">
    <div class="pg center small">
      <p class="note">必須先註冊或登入草民才能投票哦。</p>
    </div>
    <button class="park" @click="showModalAuth">註冊或登入</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  props: ['config'],
  data() {
    return {
      lib: {
        parties: []
      },
      selectedOptionID: undefined,
      ballotCasted: false
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    pollClasses() {
      return {
        closed: this.ballotCasted
      }
    }
  },
  watch: {
    isAuthenticated() {
      this.reset()
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      axios.get('/console/lab/parties').then(response => {
        this.lib.parties = response.data.rows
      })
    },
    reset() {
      this.selectedOptionID = undefined
      this.ballotCasted = false
    },
    showModalAuth() {
      this.$store.dispatch('toggleModalAuth', {
        value: true
      })
    },
    optionClasses(optionID) {
      return {
        selected: optionID === this.selectedOptionID
      }
    },
    optionImageStyle(optionID) {
      let url = `https://raw.githubusercontent.com/chihaoyo/get-rep-photos/master/9/${optionID}.jpg`
      return {
        backgroundImage: `url(${url})`
      }
    },
    flagStyle(partyAbbreviation) {
      let party = this.lib.parties.filter(party => party.abbreviation === partyAbbreviation).pop()
      return {
        background: (party ? party.color : '#EAEAEA')
      }
    },
    handleSelect(optionID) {
      if(!this.ballotCasted) {
        this.selectedOptionID = optionID
      }
    },
    castBallot() {
      if(this.selectedOptionID) {
        if(!this.ballotCasted) {
          this.ballotCasted = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/resources';

.party-flag {
  > .flag {
    width: 2rem;
    height: 1.75rem;
    display: block;
    border: none;
  	transform: skew(0, -20deg) scale(0.65);
    background: red;
  }
}

.poll {
  max-width: $bp-sm;
  margin: 1rem auto;
  @include bp-sm-down {
    padding: 0 1rem;
  }

  > .options {
    > .option {
      position: relative;
      margin: 0.5rem 0.5rem 1rem;
      cursor: pointer;

      > .image {
        width: 8rem;
        height: 8rem;
        @include bp-sm-down {
          width: 6rem;
          height: 6rem;
        }
        @include bp-xs-down {
          width: 5rem;
          height: 5rem;
        }
        border: 4px white solid;
        border-radius: 50%;
        background-color: rgba($color-park, 0.25);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      > .select {
        position: absolute;
        top: 0;
        left: 0;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 2px $color-park solid;
        @include bp-xs-down {
          top: -0.5rem;
          left: -0.5rem;
        }
      }
      > .party-flag {
        position: absolute;
        bottom: 1.75rem;
        right: 0;
      }
      > .name {
        text-align: center;
      }
    }
    > .option.selected {
      > .image {
        border-color: $color-park;
      }
      > .select {
        background: $color-park;

        &:before {
          @include checkmark(12px, white);
        }
      }
    }
  }
  > .submit,
  > .login-prompt {
    text-align: center;
  }
}
.poll.closed {
  > .options {
    > .option {
      > .select {
        border-color: transparent;
      }
    }
  }
}
</style>
