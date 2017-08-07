<template>
<div class="poll">
  <h1 class="small">{{ config.title }}</h1>
  <p>{{ config.question }}</p>
  <div class="options d-flex flex-wrap">
    <div v-for="option in config.options" :key="option.id" class="option" :class="optionClasses(option.id)" @click="handleSelect(option.id)">
      <div class="image" :style="optionImageStyle(option.id)"></div>
      <div class="select"></div>
      <div class="party-flag"><div class="flag" :style="flagStyle(option.party)"></div></div>
      <p class="name">{{ option.name }}</p>
    </div>
  </div>
  <button class="park submit">投下你的一票</button>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'https://c0re.watchout.tw'

export default {
  props: ['isAuthenticated'],
  data() {
    return {
      lib: {
        parties: []
      },
      event_id: 'abcXyz0123',
      type: 'people',
      selectedOptionID: undefined,
      config: {
        title: '桃園立委給問嗎',
        question: '這些立委，你想問誰？',
        options: [
          {
            id: '鄭運鵬',
            name: '鄭運鵬',
            party: '民進黨',
            district: '桃園市第一選舉區'
          },
          {
            id: '陳賴素美',
            name: '陳賴素美',
            party: '民進黨',
            district: '桃園市第二選舉區'
          },
          {
            id: '陳學聖',
            name: '陳學聖',
            party: '國民黨',
            district: '桃園市第三選舉區'
          },
          {
            id: '鄭寶清',
            name: '鄭寶清',
            party: '民進黨',
            district: '桃園市第四選舉區'
          },
          {
            id: '呂玉玲',
            name: '呂玉玲',
            party: '國民黨',
            district: '桃園市第五選舉區'
          },
          {
            id: '趙正宇',
            name: '趙正宇',
            party: '無黨籍',
            district: '桃園市第六選舉區'
          },
          {
            id: '吳志揚',
            name: '吳志揚',
            party: '國民黨',
            district: '全國不分區'
          }
        ]
      }
    }
  },
  beforeMount() {
    axios.get('/console/lab/parties').then(response => {
      this.lib.parties.push(...response.data.rows)
    })
  },
  methods: {
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
        background: party.color
      }
    },
    handleSelect(optionID) {
      this.selectedOptionID = optionID
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
  max-width: 36rem;
  margin: 2rem auto;

  > .options {
    > .option {
      position: relative;
      margin: 0.5rem;
      cursor: pointer;

      > .image {
        width: 8rem;
        height: 8rem;
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
      }
      > .party-flag {
        position: absolute;
        top: 6rem;
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
  > .submit {
  }
}
</style>
