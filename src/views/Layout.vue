<template>
   <div class="layout">
     <v-header />
      <router-view></router-view>
     <v-footer />
   </div>
</template>

<script type="">
import VHeader from '@/components/Header/Header'
import VFooter from '@/components/Footer/Footer'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  font-size: 16px;
  min-width: 1200px;
  .con {
    display: flex;
    flex: 1;
    flex-direction: column;
    background: #fff;
  }
}
</style>
