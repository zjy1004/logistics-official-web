<template>
   <div class="partner">
     <div class="p-banner">
       <img src="../../images/合作伙伴banner.jpg" alt="">
     </div>
     <div class="p-map">
       <img src="../../images/map.png" alt="">
     </div>
   </div>
</template>

<script type="">
export default {
  name: 'Partner',
  components: {},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.partner {
  min-width: 1280px;
  .p-banner {
    min-width: 100%;
    height: 422px;
    // img { min-width: 1280px; max-height: 422px;}
  }
  .p-map {
    min-width: 1280px;
    height: 768px;
    // img { min-width: 1280px; max-height: 768px;}
  }
}
</style>
