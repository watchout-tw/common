<template>
<footer class="standard">
  <div class="land">{{ DataStore.links.home }}</div>
</footer>
</template>

<script>
import common from '../main'

export default {
  name: 'footer-standard',
  data: function() {
    return {
      DataStore: common.DataStore
    }
  }
}
</script>
