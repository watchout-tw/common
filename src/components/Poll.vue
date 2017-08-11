<template>
<div class="poll" :class="pollClasses">
  <h1 class="small">{{ config.name }}</h1>
  <div class="paragraphs">
    <p v-if="!ballotCasted">{{ config.question }}</p>
    <p v-else>感謝你參與這次的沃草民調，你的選擇是<strong>{{ selectedOptionID }}</strong>。</p>
  </div>
  <div class="poll-loading" v-if="!initialized">載入中，請稍候⋯</div>
  <div class="poll-body" v-else>
    <div class="poll-tally" v-if="ballotCasted"><span class="underline">目前票數</span></div>
    <div class="options d-flex flex-wrap" v-if="initialized">
      <div v-for="option in config.options" :key="option.id" class="option" :class="optionClasses(option.id)" @click="handleSelect(option.id)">
        <div class="image" :style="optionImageStyle(option.id)"></div>
        <div class="select"></div>
        <div class="party-flag"><div class="flag" :style="flagStyle(option.party)"></div></div>
        <div class="name">{{ option.name }}</div>
        <div class="tally" v-if="ballotCasted"><div class="value" v-html="optionTally(option.id)"></div></div>
      </div>
    </div>
    <div class="login" v-if="!isAuthenticated">
      <div class="paragraphs center small">
        <p class="note">必須先成為草民或登入才能投票哦。</p>
      </div>
      <button class="park floating" @click="showModalAuth">成為草民或登入</button>
    </div>
    <div class="submit" v-else-if="!ballotCasted">
      <div class="paragraphs center small">
        <p class="note">請想清楚再投票，送出後無法更改。</p>
      </div>
      <button class="park floating" @click="castBallot">投下你的一票</button>
    </div>
    <div class="share" v-else>
      <div class="buttons">
        <a class="button-wrapper" :href="config.related_event.participation_link" target="_blank"><button class="park floating">我要參加{{ config.related_event.name }}</button></a>
        <a class="button-wrapper" :href="pollShareLink" target="_blank"><button class="park floating">我要分享這次民調</button></a>
      </div>
    </div>
    <div class="description">
      <h2 class="small">關於這次投票</h2>
      <div class="paragraphs">
        <p>{{ config.description }}</p>
      </div>
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

export default {
  props: ['config'],
  data() {
    return {
      lib: {
        parties: []
      },
      initialized: false,
      entity: 'Poll',
      speechTargetID: undefined,
      selectedOptionID: undefined,
      ballotCasted: false,
      tally: []
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
    },
    pollShareLink() {
      return `https://www.facebook.com/sharer/sharer.php?u=https%3A//park.watchout.tw/polls/${this.config.slug}`
    }
  },
  watch: {
    isAuthenticated() {
      util.authenticateAxios()
      this.init()
    },
    ballotCasted() {
      // get tally
      axios.get(`/park/polls/${this.config.id}`).then(response => {
        this.tally = response.data.tally
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
      this.tally = []
      // get list of party
      axios.get('/c0ngress/parties').then(response => {
        this.lib.parties = response.data.rows
      })

      if(this.isAuthenticated) {
        // get speech target ID for ballot registration
        if(!this.speechTargetID) {
          axios.get(`/park/citizen_speech_targets?source_entity=${this.entity}&source_id=${this.config.id}`).then(response => {
            this.speechTargetID = response.data.rows.pop().id
          }).catch(util.handleThatError)
        }

        // check if citizen has already casted ballot
        axios.get(`/citizen/speeches?target_source_entity=${this.entity}&target_source_id=${this.config.id}`).then(response => {
          let speeches = response.data.rows
          if(speeches.length > 0) {
            let speech = speeches[speeches.length - 1]
            this.ballotCasted = true
            this.selectedOptionID = speech.content
          }
          this.initialized = true
        }).catch(util.handleThatError)
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
    optionTally(optionID) {
      if(this.tally.length > 0) {
        let match = this.tally.filter(item => item.content === optionID)
        if(match.length > 0) {
          return match.pop().count
        }
      }
      return 0
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
          axios.post('/citizen/speeches', speechObj).then(response => {
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
    > .poll-tally {
      margin-bottom: 1rem;
      text-align: center;
      color: $color-secondary-text-grey;
      > .underline {
        padding-bottom: 2px;
        border-bottom: 1px $color-secondary-text-grey solid;
      }
    }

    > .options {
      > .option {
        position: relative;
        margin: 0.5rem 0.5rem 1rem;
        cursor: pointer;

        @mixin status-indicator {
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
          border: 0.3125rem white solid;
          border-radius: 50%;
          background-color: rgba($color-park, 0.25);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }
        > .select {
          @include status-indicator;
        }
        > .party-flag {
          position: absolute;
          bottom: 1.65rem;
          right: -0.45rem;
        }
        > .name {
          text-align: center;
        }
        > .tally {
          @include status-indicator;
          background: $color-park;
          text-align: center;
          font-size: 1.25rem;
          > .value {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
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
    > .login,
    > .submit,
    > .share {
      text-align: center;
    }
    > .share {
      margin: 0.5rem 0;
    }
    > .description {
      margin: 4rem 0;
    }
  }
}
.poll.ballot-casted {
  > .poll-body {
    > .options {
      > .option {
        cursor: default;
      }
    }
  }
}
</style>
