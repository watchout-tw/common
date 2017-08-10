<template>
<div class="poll" :class="pollClasses">
  <h1 class="small">{{ config.name }}</h1>
  <div class="pg">
    <p>{{ config.question }}</p>
  </div>
  <div class="poll-loading" v-if="!initialized">載入中，請稍候⋯</div>
  <div class="poll-body" v-else>
    <div class="tally-title" v-if="ballotCasted"><span>目前票數</span></div>
    <div class="options d-flex flex-wrap" v-if="initialized">
      <div v-for="option in config.options" :key="option.id" class="option" :class="optionClasses(option.id)" @click="handleSelect(option.id)">
        <div class="image" :style="optionImageStyle(option.id)"></div>
        <div class="select"></div>
        <div class="party-flag"><div class="flag" :style="flagStyle(option.party)"></div></div>
        <div class="name">{{ option.name }}</div>
        <div class="tally" v-if="ballotCasted"><span class="value">{{ (tally[option.id] ? tally[option.id] : []).length }}</span><span class="unit">票</span></div>
      </div>
    </div>
    <div class="login-prompt" v-if="!isAuthenticated">
      <div class="pg center small">
        <p class="note">必須先成為草民或登入才能投票哦。</p>
      </div>
      <button class="park" @click="showModalAuth">成為草民或登入</button>
    </div>
    <div class="submit" v-else-if="!ballotCasted">
      <div class="pg center small">
        <p class="note">請想清楚再投票，送出後無法更改。</p>
      </div>
      <button class="park" @click="castBallot">投下你的一票</button>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../lib/util'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://c0re.watchout.tw'
util.authenticateAxios()

const _collection = require('lodash/collection')

const parties = [ // FIXME: get list of party from core instead of hard-coding them
  {
    abbreviation: '無黨籍',
    color: '#EAEAEA'
  },
  {
    abbreviation: '國民黨',
    color: '#000095'
  },
  {
    abbreviation: '民進黨',
    color: '#009A00'
  }
]

export default {
  props: ['config'],
  data() {
    return {
      initialized: false,
      lib: {
        parties
      },
      entity: 'Poll',
      speechTargetID: undefined,
      selectedOptionID: undefined,
      ballotCasted: false,
      tally: {}
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    citizenHandle() {
      return localStorage.getItem('watchout-citizen-handle')
    },
    pollClasses() {
      return {
        'ballot-casted': this.ballotCasted,
        'closed': this.config.ballotClosed
      }
    }
  },
  watch: {
    isAuthenticated() {
      util.authenticateAxios()
      this.init()
    },
    ballotCasted() {
      // get tally
      axios.get(`/park/citizen_speeches?target_source_entity=${this.entity}&target_source_id=${this.config.id}`).then(response => {
        this.tally = _collection.groupBy(response.data.rows, 'content')
      }).catch(util.handleThatError)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selectedOptionID = undefined
      this.ballotCasted = false
      this.tally = {}
      // FIXME: get list of party from core

      if(this.isAuthenticated) {
        // get speech target ID for ballot registration
        if(!this.speechTargetID) {
          axios.get(`/park/citizen_speech_targets?source_entity=${this.entity}&source_id=${this.config.id}`).then(response => {
            this.speechTargetID = response.data.rows.pop().id
          }).catch(util.handleThatError)
        }

        // check if citizen has already casted ballot
        if(this.isAuthenticated && this.citizenHandle) {
          axios.get(`/park/citizen_speeches?citizen_handle=${this.citizenHandle}&target_source_entity=${this.entity}&target_source_id=${this.config.id}`).then(response => {
            let speeches = response.data.rows
            if(speeches.length > 0) {
              let speech = speeches[speeches.length - 1]
              this.ballotCasted = true
              this.selectedOptionID = speech.content
            }
            this.initialized = true
          }).catch(util.handleThatError)
        }
      } else {
        this.initialized = true
      }
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
          // register this ballot
          let speechObj = {
            citizen_speech_target_id: this.speechTargetID,
            type: 'ballot',
            content: this.selectedOptionID
          }
          axios.post('/park/citizen_speeches', speechObj).then(response => {
            this.ballotCasted = true
          }).catch(util.handleThatError)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/resources';

.party-flag {
  width: 2rem;
  height: 1.75rem;

  > .flag {
    width: 100%;
    height: 100%;
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
  > .poll-body {
    > .tally-title {
      text-align: center;
      color: $color-secondary-text-grey;
      > span {
        padding-bottom: 2px;
        border-bottom: 1px $color-secondary-text-grey solid;
      }
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
}
@mixin inline-block-middle {
  display: inline-block;
  vertical-align: middle;
}

.poll.ballot-casted {
  > .poll-body {
    > .options {
      > .option {
        width: 50%;
        @include bp-sm-down {
          width: 100%;
        }
        margin: 0.25rem 0;
        cursor: default;

        > .image,
        > .name,
        > .tally {
          @include inline-block-middle;
        }

        > .image {
          width: 4rem;
          height: 4rem;
        }
        > .select {
          top: -0.5rem;
          left: -0.5rem;
          border-color: transparent;
        }
        > .party-flag {
          top: 1rem;
          left: 3rem;
        }
        > .name {
          margin-left: 1rem;
        }
        > .tally {
          > * {
            @include inline-block-middle;
          }
          > .value {
            font-size: 1.25rem;
          }
          > .unit {
            margin-left: 0.125rem;
          }
        }
      }
    }
  }
}
</style>
