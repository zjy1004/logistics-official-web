<template>
   <div class="index">
     <div class="index-banner">
       <img src="../../images/bg360.jpg" alt="">
     </div>
     <div class="index-sever">
       <div class="sever-item item-position1">
         <div class="s-inner-img"><img src="../../images/首页-金融服务.png" alt=""></div>
         <div class="s-inner-item"></div>
       </div>
       <div class="sever-item item-position2">
         <div class="s-inner-img item-position1"><img src="../../images/首页-营销服务.png" alt=""></div>
         <div class="s-inner-item"></div>
       </div>
       <div class="sever-item item-position3">
         <div class="s-inner-img"><img src="../../images/首页-信息服务.png" alt=""></div>
         <div class="s-inner-item"></div>
       </div>
       <div class="sever-item item-position4">
         <div class="s-inner-img"><img src="../../images/首页-更多服务.png" alt=""></div>
         <div class="s-inner-item"></div>
       </div>
     </div>
   </div>
</template>

<script type="">
export default {
  name: 'Index',
  components: {},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.index {
  // display: flex;
  // flex-direction: column;
  // width: 1920px;
  // .index-banner {
  //   // width: 100%;
  //   // height: 550px;
  //   img {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
  min-width: 1200px;
  .banner {
    // width: 100%;
    // height: 550px;
    // width: 1200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .index-sever {
    height: 460px;
    display: flex;
    background:rgba(249,250,255,1);
    align-items: center;
    justify-content: center;
    .sever-item {
      width: 300px;
      height: 300px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      .s-inner-img {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 1s;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .s-inner-item {
        width:300px;
        height:203px;
        position: absolute;
        top: 97px;
        left: 0;
        background:rgba(0,0,0);
        opacity:0.3;
        transition: all 1s;
      }
    }
    .sever-item:hover .s-inner-img{
      transform: scale(1.2) ;
    }
    .sever-item:hover .s-inner-item {
      top: 0;
      opacity: 0.1;
    }
  }
}
</style>
