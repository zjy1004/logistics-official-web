<template>
   <div class="footer">
     <div class="f-con">
       <div class="c-left">
         <div class="l-phone">400-008-8122</div>
         <div class="l-date common-text">周一至周日：9:00-18:00</div>
         <div class="l-email common-text">邮箱：Servie@autozi.com</div>
         <div class="l-web common-text">网址：www.wlautozi.com</div>
         <div class="l-address common-text">地址：北京市海淀区北清路68号用友软件园中区9号楼</div>
       </div>
       <div class="c-right">
         <div class="r-text">
           <div class="t-title r-title">支持与服务</div>
           <div class="t-con">
             <div class="common-text">首页</div>
             <div class="common-text">物流查询</div>
             <div class="common-text">合作伙伴</div>
             <div class="common-text">关于我们</div>
           </div>
         </div>
         <div class="r-code">
           <div class="c-title r-title">关注中驰物联</div>
           <div class="c-img">
             <div class="img-item">
               <div class="img-wrap"><img src="../../images/云驿通客户二维码.png" alt=""></div>
               <div class="img-info common-text">物流商APP</div>
              </div>
             <div class="img-item ml50">
               <div class="img-wrap"><img src="../../images/云驿通客户二维码.png" alt=""></div>
               <div class="img-info common-text">云驿通客户APP</div>
              </div>
             <div class="img-item ml50">
               <div class="img-wrap"><img src="../../images/云驿通客户二维码.png" alt=""></div>
               <div class="img-info common-text">云驿通客户小程序</div>
              </div>
           </div>
           <!-- <div class="c-info">
             <div class="info-first common-text">物流商APP</div>
             <div class="info-second common-text">云驿通客户APP</div>
             <div class="info-third common-text">云驿通客户小程序</div>
           </div> -->
         </div>
       </div>
     </div>
     <div class="f-bottom">京公网安备11010802025642 | 京ICP备11020175号-4 | 京ICP证130186号 Copyright ©Autozi.com 2019 All Rights Reserved. Powered by Autozi</div>
   </div>
</template>

<script type="">
export default {
  name: 'Footer',
  components: {},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.footer {
  width:1920px;
  height:394px;
  background:rgba(33,35,48,1);
  .f-con {
    margin: 0 auto;
    width: 1200px;
    height: 262px;
    display: flex;
    .common-text {
      font-size: 14px;
      color:rgba(153,153,153,1);
      font-family:Microsoft YaHei;
      font-weight:400;
      opacity:0.75;
    }
    .c-left {
      width: 600px;
      .l-phone {
        margin-top: 61px;
        font-size:36px;
        font-family:Arial;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:37px;
      }
      .l-date { margin-top: 20px; }
      .l-email { margin-top: 40px; }
      .l-web { margin-top: 15px; }
      .l-address { margin-top: 15px; }
    }
    .c-right {
      width: 600px;
      display: flex;
      justify-content: space-between;
      .r-title {
        height:19px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .r-text {
        margin-top: 59px;
        .t-title {}
        .t-con {
          margin-top: 29px;
          line-height: 26px;
        }
      }
      .r-code {
        margin-top: 60px;
        .c-title {}
        .c-img {
          display: flex;
          margin-top: 29px;
          width: 400px;
          justify-content: space-between;
          .img-item {
            display: flex;
            flex-direction: column;
            text-align: right;
            // align-items: center;
          }
          .img-wrap {
            width: 120px;
            height: 120px;
          }
          .img-info {
            margin-top: 11px;
            width: 120px;
            text-align: center;
          }
          // .ml50 {
          //   margin-left: 40px;
          // }
        }
        .c-info {
          display: flex;
          justify-content: space-between;
          margin-top: 11px;
          .info-item {}
          // .info-first { margin-left: 13px; }
          // .info-second { margin-left: 63px; }
          // .info-third { margin-left: 41px; }
        }
      }
    }
  }
  .f-bottom {
    width: 1200px;
    margin: 0 auto;
    margin-top: 39px;
    height:14px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
}
</style>
