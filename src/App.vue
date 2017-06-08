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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
