<template>
<div id="app">
  <NavigationWithIdentity></NavigationWithIdentity>
  <FooterStandard></FooterStandard>
</div>
</template>

<script>
import NavigationWithIdentity from './components/Navigation/Identity'
import FooterStandard from './components/Footer/Standard'

export default {
  name: 'app',
  components: {
    NavigationWithIdentity,
    FooterStandard
  }
}
</script>

<style lang="scss">
@import 'styles/resources';
@import 'styles/main';
</style>
