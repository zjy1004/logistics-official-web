<template>
  <div id="app">
    <layout />
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Layout from '@/views/Layout'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
