const https = 'https://'
const rootURL = https + 'watchout.tw' + '/'
var links = {
  home: rootURL,
  support: {
    general: rootURL + '#support',
    watchout: {
      custom: 'https://watchout.backme.tw/checkout/332/2688',
      direct: 'https://watchout.backme.tw/checkout/332/2686'
    },
    ask: {
      direct: 'https://watchout.backme.tw/checkout/332/2686'
    }
  },
  contact: rootURL + 'contact'
}

class Channel {
  constructor(id, width, home, name, isDark = false) {
    this.id = id
    this.name = name
    this.classes = {
      backgroundColor: {
        opaque: 'bg-' + id,
        light: 'bg-' + id + '-light'
      }
    }
    this.links = {
      home: home
    }
    this.assets = {
      logo: {
        // large: require(`../../static/logo/${id}/large.png`),
        // small: require(`../../static/logo/${id}/small.png`)
      },
      logoWithType: {
        regular: {
          // src: require(`../../static/logo+type/${id}/regular.png`),
          width: width,
          styles: {
            width: width + 'px'
          }
        }
      }
    }
    this.isDark = isDark
    this.showSwitcher = id !== 'watchout'
  }
}

var channels = {
  core: new Channel('core', 158, 'https://core.watchout.tw/', '運算核心', true),
  console: new Channel('console', 138, 'https://console.watchout.tw', '中控室'),
  park: new Channel('park', 158, 'https://park.watchout.tw/', '中央公園'),
  kangsim: new Channel('kangsim', 138, 'https://park.watchout.tw/kangsim', '找共識'),
  lab: new Channel('lab', 178, 'https://lab.watchout.tw/', '議題實驗室'),
  musou: new Channel('musou', 158, 'https://musou.watchout.tw/', '國會無雙', true),
  ask: new Channel('ask', 158, 'https://ask.watchout.tw/', '給問擂台'),
  edu: new Channel('edu', 158, 'https://edu.watchout.tw/', '公民學院'),
  c0ngress: new Channel('c0ngress', 158, 'https://c0ngress.watchout.tw/', '野生國會', true),
  watchout: new Channel('watchout', 274, links.home, '沃草')
}

export default {
  links: links,
  channels: channels
}
