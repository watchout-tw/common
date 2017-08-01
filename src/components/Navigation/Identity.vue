<template>
<nav class="navbar sticky-top d-flex flex-row" :class="channel.classes.bg">
    <a class="navbar-brand" :href="channel.links.home"><img :src="channel.asset.logoWithType.regular.src" class="logo-type" :style="channel.asset.logoWithType.regular.style"/></a>
    <el-menu :router="true" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-submenu v-for="(group, groupIndex) in menu" :index="root + group.id" :key="group.id">
        <template slot="title">{{ group.name }}</template>
        <el-menu-item v-for="(page, index) of group.pages" :index="root + page.id" :key="page.id">
          <router-link :to="{ name: page.routes.list.name }">{{ page.title }}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <a class="navbar-button" :class="isAuthenticated ? 'identity-citizen' : 'identity-anon'" id="navbar-identity" @click="toggleModalAuth"></a>
</nav>
</template>

<script>
import * as util from '../../lib/util'

export default {
  name: 'navigation-with-identity',
  props: ['channel', 'isAuthenticated', 'modalAuthIsShown', 'menu'],
  data() {
    return {
      root: '/',
      activeIndex: undefined
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  mounted() {
    console.log('#' + this.channel.id)
    console.log('Navigation with identity initiated.')
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    },
    toggleModalAuth() {
      if (util.jwtTokenIsExist()) {
        // TODO: slide sidebar while logged in
        alert('你登入了～好棒棒')
      } else {
        this.$emit('update:modalAuthIsShown', !this.modalAuthIsShown)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/resources';

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
