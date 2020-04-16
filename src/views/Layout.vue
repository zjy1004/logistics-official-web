<template>
   <div class="layout">
     <v-header />
     <div class="con">
      <router-view></router-view>
     </div>
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
  // display: flex;
  // flex: 1;
  // flex-direction: column;
  // height: 100%;
  overflow-y: auto;
  font-size: 16px;
  .con {
    // display: flex;
    // flex: 1;
    // flex-direction: column;
    background: #fff;
  }
}
</style>
