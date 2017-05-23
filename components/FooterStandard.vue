<template>
<footer class="standard">
  <div class="land">
    <div class="green"></div>
    <div class="soil">
      <div class="light"></div>
      <div class="dark"></div>
      <div class="deep">
        <div class="social">
          <div v-for="group in cptSocialGroups" class="group d-flex flex-row justify-content-around" :type="group.type">
            <a v-for="item in group.items" :href="item.link" class="link a-block" target="social">
              <div class="image">
                <img :src="item.image" />
                <div class="type"></div>
              </div>
              <div class="message">{{ item.message }}</div>
            </a>
          </div>
        </div>
        <div class="cluster d-flex flex-row justify-content-center">
          <div v-for="group in cluster" class="group">
            <h5>{{ group.title }}</h5>
            <div v-for="item in group.links" class="item"><a :href="item.link" class="a-text">{{ item.title }}</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="elements">
      <div class="grass d-flex align-items-end justify-content-between">
        <div v-for="i in patchCount()" class="patch" :class="patchSize()" :style="patchStyles(i)"></div>
      </div>
      <img v-for="tree in trees" :src="getTreeAssetURL(tree)" :class="getTreeClasses(tree)" />
    </div>
  </div>
</footer>
</template>

<script>
import main from '../main'

var social = [
  {
    type: 'facebook',
    image: 'https://graph.facebook.com/watchout.tw/picture?type=large',
    message: '追蹤我們的最新動態！',
    link: 'https://facebook.com/watchout.tw/',
  },
  {
    type: 'LINE',
    image: 'https://watchout.tw/asset/social/LINE/goodfriend.png',
    message: '阿草好朋友',
    link: 'https://store.line.me/stickershop/product/1024870/zh-Hant',
  },
  {
    type: 'LINE',
    image: 'https://watchout.tw/asset/social/LINE/goodcitizen.png',
    message: '阿草督督好',
    link: 'https://store.line.me/stickershop/product/1224270/zh-Hant',
  }
]
var cluster = [
  {
    title: '沃草產品',
    links: [
      {
        title: '國會無雙',
        link: 'https://musou.tw/',
      },
      {
        title: '給問擂台',
        link: 'https://ask.watchout.tw/',
      },
      {
        title: '公民學院',
        link: 'https://citizenedu.tw/',
      },
    ],
  },
  {
    title: '關於沃草',
    links: [
      {
        title: '2014 透明報告',
        link: main.DataStore.links.home + 'transparency/2014',
      },
      {
        title: '歷年影響力報告',
        link: main.DataStore.links.home + 'impact',
      },
      {
        title: '聯絡我們',
        link: main.DataStore.links.home + 'contact',
      },
      {
        title: '授權條款',
        link: main.DataStore.links.home + 'license',
      },
    ],
  }
]
var trees = [
  {
    type: 'tree',
    name: 'deliberate',
    filetype: 'png',
  },
  {
    type: 'tree',
    name: 'discover',
    filetype: 'png',
  },
  {
    type: 'tree',
    name: 'investigate',
    filetype: 'png',
  },
  {
    type: 'farmer',
    name: 'tangerine',
    filetype: 'png',
  },
  {
    type: 'farmer',
    name: 'green',
    filetype: 'png',
  },
  {
    type: 'farmer',
    name: 'brown',
    filetype: 'png',
  },
  {
    type: 'tree',
    name: 'sprout',
    filetype: 'png',
  }
]

export default {
  name: 'footer-standard',
  data() {
    return {
      DataStore: main.DataStore,
      social: social,
      cluster: cluster,
      trees: trees
    }
  },
  methods: {
    patchCount: function() {
      return 4 + Math.round(Math.random()*2);
    },
    patchSize: function() {
      return Math.random() > 0.5 ? 'big' : 'small';
    },
    patchStyles: function(i) {
      return {
        transform: 'translateX(' + (Math.round(Math.random())*2 - 1)*Math.round(Math.random()*16) + 'rem)',
      };
    },
    getTreeAssetURL: function(tree) {
      return this.DataStore.links.home + 'asset/footer/' + tree.type + '/' + tree.name + '.' + tree.filetype;
    },
    getTreeClasses: function(tree) {
      return [tree.type, tree.type + '-' + tree.name];
    }
  },
  computed: {
    cptSocialGroups: function() {
      var arr = this.social;
      var result = [];
      var types = {};
      for(var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if(!(cur.type in types)) {
          types[cur.type] = {type: cur.type, items: []};
          result.push(types[cur.type]);
        }
        types[cur.type].items.push(cur);
      }
      return result;
    }
  }
}
</script>

<style lang="scss">
@import '../styles/resources';

// Footer
footer.standard {
  margin-top: 8rem;

  > .land {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 100%;
    background-color: white;
    > .green,
    > .soil > .light,
    > .soil > .dark,
    > .soil > .deep {
      background-position: center;
      background-size: contain;
    }
    > .green {
      height: 14rem;
      background-image: url(https://watchout.tw/asset/footer/land/grass.png);
      background-repeat: repeat-x;
    }
    > .soil {
      > .light, > .dark {
        height: 2rem;
        background-repeat: no-repeat;
      }
      > .light {
        background-color: $color-soil-light;
        background-image: url(https://watchout.tw/asset/footer/land/soil/light.png);
      }
      > .dark {
        background-color: $color-soil-dark;
        background-image: url(https://watchout.tw/asset/footer/land/soil/dark.png);
      }
      > .deep {
        background-color: $color-soil-deep;
        padding-bottom: 2rem;
      }
    }
    > .elements {
      position: absolute;
      top: 0;
      width: 100%;
      height: 18rem;

      > .grass {
        position: absolute;
        bottom: 6rem;
        width: 100%;
        overflow: hidden;

        > .patch {
          background-size: contain;

          &.big {
            width: 1.75rem;
            height: 0.875rem;
            background-image: url(https://watchout.tw/asset/footer/grass/big.png);
          }
          &.small {
            width: 0.75rem;
            height: 0.5rem;
            background-image: url(https://watchout.tw/asset/footer/grass/small.png);
          }
        }
      }
      > .tree {
        position: absolute;

        &.tree-deliberate {
          bottom: 5.25rem;
          left: 10%;
          width: 11.25rem;
        }
        &.tree-discover {
          bottom: 5rem;
          left: 10%;
          @include transform(translateX(6rem));
          width: 8.5rem;
        }
        &.tree-investigate {
          display: none;
          bottom: 5.5rem;
          right: 10%;
          width: 11.875rem;

          @include bp-sm-up {
            display: block;
          }
        }
        &.tree-sprout {
          bottom: 4rem;
          left: 50%;
          @include transform(translateX(4rem));
          width: 1.25rem;
        }
      }
      > .farmer {
        position: absolute;

        &.farmer-tangerine {
          bottom: 1.5rem;
          left: 12%;
          width: 4.625rem;
        }
        &.farmer-green {
          bottom: -0.5rem;
          right: 8%;
          width: 5rem;
        }
        &.farmer-brown {
          bottom: 4.5rem;
          left: 10%;
          @include transform(translateX(14rem));
          width: 2rem;
        }
      }
    }
  }
  // social links
  > .land > .soil > .deep > .social {
    margin: 0 auto;
    padding: 6rem 0;
    max-width: 20rem;

    > .group {
      margin: 2rem;
      > .link {
        > .image {
          display: block;
          position: relative;
          margin: 0 auto;
          width: 5.625rem;

          > img {
            width: 100%;
          }
          > .type {
            position: absolute;
            top: -0.5rem;
            left: -0.5rem;
            width: 1.625rem;
            height: 1.625rem;
            background-size: contain;
          }
        }
        > .message {
          @include font-serif;
          font-weight: bold;
          font-size: 1.125rem;
          color: rgba(white, 0.75); //color-nice-grey;
          //ransform: translate(2rem, -0.5rem) rotate(-15deg);
        }
      }

      &[type="facebook"] > .link > .image > .type {
        background-image: url(https://watchout.tw/asset/social/facebook/round.png);
      }
      &[type="LINE"] > .link > .image > .type {
        background-image: url(https://watchout.tw/asset/social/LINE/round.png);
      }
    }
  }
  // link cluster
  > .land > .soil > .deep > .cluster {
    color: white;

    > .group {
      margin: 0 2rem;
      > .item {
        color: rgba(white, 0.75); //$color-nice-grey;
        text-align: left;
      }
    }
  }
}
</style>
