<template>
   <div class="about-us">
     <div class="us-banner"><img src="../../images/关于我们banner.jpg" alt=""></div>
     <div class="us-info">
       <div class="info-wrap">
        <div class="w-nav">
          <span style="cursor: pointer;" @click="toIndex()">首页</span>
          <span style="margin: 0 2px; font-size: 16px;">></span>
          <span>关于我们</span>
        </div>
        <div class="w-content">
          <div class="c-company">
            <div class="com-name">中驰物联科技有限公司</div>
            <div class="com-info">中驰物联科技有限公司是专注于垂直汽配汽配物流细分领域，以物流4PL服务商为基础的依托互联网手段承载及服务于汽配供应商和终端维保企业的供应链云平台。既不是一个传统的服务商（自营或控股实施干线/专线/城配线路的运营商），也不是以物流资源整合方式的综合物流服务商，而是以互联网技术为手段提升物流运作与协同效率的公共服务平台。</div>
            <ul class="com-desc">
              <li class="desc-item">
                <div class="item-icon"><img src="../../images/auxiliary-icon.png" alt=""></div>
                <div class="item-text">通过联合建设线下实体分拨中心进一步提高物流现场作业和协同管理的效率。</div>
              </li>
              <li class="desc-item">
                <div class="item-icon"><img src="../../images/auxiliary-icon.png" alt=""></div>
                <div class="item-text">通过线上多场景的汽配物流SAAS产品，链接配件商、物流商及终端维修厂，实现运单电子化、过程管理透明化，进而提供安全、高效、省心的货物承运和交付服务。</div>
              </li>
              <li class="desc-item">
                <div class="item-icon"><img src="../../images/auxiliary-icon.png" alt=""></div>
                <div class="item-text">通过提供专业的汽配代收资金在线支付与清分管理工具—驮付宝，实现物流商清晰实时的账务管理、经销商代收资金的安全透明与及时回笼管理。</div>
              </li>
              <li class="desc-item">
                <div class="item-icon"><img src="../../images/auxiliary-icon.png" alt=""></div>
                <div class="item-text">通过多元化的增值服务的提供，充分运用垂直物流参与各方业务的高度紧密特性，在多层次服务提供的同时最大程度的挖掘营销推广、资金融通、交易信息及资源转化，从而实现多方共赢。</div>
              </li>
            </ul>
            <div class="com-line"></div>
            <div class="com-address">
            <span class="com-left-span">公司地址：</span>
            <span class="com-right-span">北京市海淀区北清路68号用友软件园中区9号楼</span>
            </div>
            <div class="com-tel">
            <span class="com-left-span">联系电话：</span>
            <span class="com-right-span">400-008-8122</span>
            </div>
            <div class="com-web">
            <span class="com-left-span">官网：</span>
            <span class="com-right-span">www.wlautozi.com</span>
            </div>
            <div id="map-us" class="com-map"></div>
          </div>
        </div>
       </div>
     </div>
   </div>
</template>

<script type="">
import MapLoader from '@/assets/AMap.js'
// import talkIcon from '@/images/对话框.png'
export default {
  name: 'AboutUs',
  components: {},
  data () {
    return {
      map: null,
      mapOption: {
        resizeEnable: false,
        center: ['116.236857', '40.066654'],
        zoom: 17
      },
      componyPosition: ['116.236857', '40.066654']
    }
  },
  methods: {
    toIndex () {
      debugger
      this.$router.push({name: 'Index'})
    },
    mapInit () {
      MapLoader().then(AMap => {
        this.map = new AMap.Map('map-us', this.mapOption)
        this.drawMarker(AMap)
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    // 绘制标记点
    drawMarker (AMap) {
      let marker = new AMap.Marker({
        map: this.map,
        draggable: false,
        position: this.componyPosition,
        riseOnHover: true,
        title: '',
        icon: new AMap.Icon({
          size: new AMap.Size(0, 0), // 图标的大小
          image: ''
        }),
        autoRotation: true,
        angle: 0
      })
      marker.setLabel({
        offset: new AMap.Pixel(-25, -30), // 设置文本标注偏移量
        content: `<div class="tag">
                    <div class="arrow">
                      <em></em><span></span>
                    </div>
                   &nbsp;北京市海淀区北清路68号用友软件园中区9号楼&emsp;
                  </div>`, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
      })
      this.map.add(marker)
    }
  },
  mounted () {
    this.mapInit()
  }
}
</script>

<style scoped lang="less">
.about-us {
  min-width: 1280px;
  .us-banner { min-width: 1280px; height: 422px; }
  .us-info {
    height: 1107px;
    background: rgba(246,248,251,1);
    display: flex;
    justify-content: center;
    .info-wrap {
      width: 1200px;
      .w-nav {
        width: 100%;
        height: 50px;
        line-height: 50px;
        span { font-size: 14px; color:#969AA9; font-family: Source Han Sans CN;}
      }
      .w-content {
        width: 100%;
        height: 996px;
        background: rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        align-items: center;
        .c-company {
          width: 1100px;
          margin-top: 30px;
          .com-name { font-size:24px; color:rgba(38,38,38,1); }
          .com-info { font-size:14px; color:rgba(107,111,126,1); line-height: 26px; margin-top: 41px;}
          .com-desc {
            margin-top: 42px;
            .desc-item {
              display: flex;
              margin-top: 12px;
              .item-icon { height: 21px; width: 21px; margin-top: 4px; img { width: 21px; height: 21px; } }
              .item-text { font-size:14px; color:rgba(107,111,126,1); line-height: 26px; margin-left: 12px; }
            }
          }
          .com-line { width:1100px; height:1px; background:rgba(241,241,241,1); margin-top: 54px;}
          .com-address { margin-top: 49px; }
          .com-tel { margin-top: 18px; }
          .com-web { margin-top: 18px; }
          .com-left-span { font-size:14px; color: #0A1633; }
          .com-right-span { font-size:14px; color: #6B6F7E; }
          .com-map { width: 1100px; height: 370px; margin-top: 27px; }
        }
      }
    }
  }
}
</style>
<style lang="less">
.about-us {
  #map-us {
    .amap-marker-label{
      border: none;
      background: #fff;
      opacity: 1;
      padding: 0;
      .info{
        font-weight: bold;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        font-size: 16px;
        color: #fff;
        background-color: #FF9900;
      }
      .tag{  font-size: 12px; color: #000;height:35px; border: 2px solid #ccc; line-height: 2; position:relative; background-color: #fff; opacity: 0.7;}
      .arrow{ position:absolute; width:40px; height:40px; bottom:-40px; left:10px; }
      .arrow *{ display:block; border-width:12px; position:absolute; border-style:solid dashed dashed dashed; font-size:0; line-height:0; }
      .arrow em{border-color:#ccc transparent transparent;}
      .arrow span{border-color: #fff transparent transparent; top:-2px;}
    }
    .amap-icon{
      img{
        width: 90%!important;
        height: 100%!important;
      }
    }
  }
}
</style>
