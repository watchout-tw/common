<template>
<nav class="navbar sticky-top d-flex flex-row" :class="channel.classes.bg">
    <router-link class="navbar-brand" :class="channelButtonClasses" :to="{ path: '/' }"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></router-link>
    <el-menu v-if="menu" :router="true" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-submenu v-for="group in menu" :index="group.id" :key="group.id">
        <template slot="title">{{ group.name }}</template>
        <el-menu-item v-for="page of group.pages" :index="page.basePath" :key="page.basePath">{{ page.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
    <a class="navbar-button" :class="identityButtonClasses" id="navbar-identity" @click.self="toggleModalAuth"></a>
</nav>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../../lib/util'

Vue.use(Vuex)

export default {
  name: 'navigation-with-identity',
  props: ['channel', 'menu'],
  data() {
    return {
      root: '/',
      activeIndex: undefined
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    channelButtonClasses() {
      let classes = []
      if(this.menu) {
        classes.push('compact')
      }
      return classes
    },
    identityButtonClasses() {
      return [this.isAuthenticated ? 'identity-citizen' : 'identity-anon']
    }
  },
  created() {
    if(this.$route) {
      this.activeIndex = this.$route.path
    }
    if(this.isAuthenticated) {
      util.getCitizen(this.$store)
    }
  },
  mounted() {
    console.log('Navigation mounted')
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    },
    toggleModalAuth() {
      if(util.jwtTokenIsHere()) {
        this.$store.dispatch('toggleModalIdentity', {
          value: !this.$store.state.modalIdentityIsShown
        })
      } else {
        this.$store.dispatch('toggleModalAuth', {
          value: !this.$store.state.modalAuthIsShown
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

.navbar-brand {
  &.compact {
    @include bp-lg-alt-down {
      width: $navbar-height;
      overflow: hidden;
    }
  }
}
.navbar-button {
  display: block;
  width: 60px;
  height: $navbar-height;
  &:hover {
    background: rgba(white, 0.25);
  }
}
#navbar-identity {
  position: absolute;
  top: 0;
  right: 0;
  background-size: contain;

  &.identity-anon {
    background-image: url(assets/identity/robot.png);
  }
  &.identity-citizen {
    background-image: url(assets/identity/human.png);
  }
}

// FIXME: ElementIO Navbar hack
.el-menu {
  background: none;
}
.el-menu--horizontal .el-submenu .el-submenu__title {
  height: $navbar-height;
  line-height: $navbar-height;
}
.el-menu--horizontal .el-submenu > .el-menu {
  top: $navbar-height + 4px;
}
.el-menu-item, .el-submenu__title {
  padding: 0 16px;
  color: black;
}
.el-menu--horizontal .el-submenu .el-submenu__icon-arrow {
  color: rgba(black, 0.65);
}
.el-menu--horizontal > .el-menu-item:hover,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
  border-bottom-color: rgba(black, 0.65);
}
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-submenu__title:hover {
  background: rgba(black, 0.1);
}
</style>
