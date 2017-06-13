<template>
<div class="vote">
  <div v-for="option in options">{{ option.name }}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      type: 'people',
      options: [
        {
          id: 'aaa',
          name: 'AAA'
        },
        {
          id: 'bbb',
          name: 'BBB'
        },
        {
          id: 'ccc',
          name: 'CCC'
        },
        {
          id: 'ddd',
          name: 'DDD'
        },
        {
          id: 'eee',
          name: 'EEE'
        }
      ]
    }
  }
}
</script>

<style>
</style>
