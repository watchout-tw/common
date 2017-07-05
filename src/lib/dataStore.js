var links = {
  home: 'https://watchout.tw/',
  support: 'https://watchout.tw/#support',
  contact: 'https://watchout.tw/contact'
}

class Channel {
  constructor(id, width, home, name) {
    this.id = id
    this.name = name
    this.classes = {
      bg: 'bg-' + this.id
    }
    this.links = {
      home: home
    }
    this.asset = {
      logo: {
        large: links.home + 'asset/logo/' + this.id + '/large.png',
        small: links.home + 'asset/logo/' + this.id + '/small.png'
      },
      logoWithType: {
        regular: {
          src: links.home + 'asset/logo+type/' + this.id + '/regular.png',
          width: width,
          style: { width: width + 'px' }
        }
      }
    }
  }
}

var channels = {
  park: new Channel('park', 212, 'https://park.watchout.tw/', '中央公園'),
  lab: new Channel('lab', 232, 'https://lab.watchout.tw/', '議題實驗室'),
  musou: new Channel('musou', 212, 'https://musou.watchout.tw/', '國會無雙'),
  ask: new Channel('ask', 212, 'https://ask.watchout.tw/', '給問擂台'),
  edu: new Channel('edu', 212, 'https://edu.watchout.tw/', '公民學院'),
  maa: new Channel('maa', 132, 'https://maa.watchout.tw/', '草漫'),
  woo: new Channel('woo', 154, 'https://woo.watchout.tw/', '沃影音'),
  c0ngress: new Channel('c0ngress', 212, 'https://c0ngress.watchout.tw/', '立委履歷'),
  watchout: new Channel('watchout', 274, links.home, '沃草')
}

export default {
  links: links,
  channels: channels
}
